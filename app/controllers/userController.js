const User = require('../models/User');
const sql = require('../models/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const countdown = require('countdown-js');

let counter = 0;
let timerDone = false;
let isTimerOngoing = false;

async function findBySomething(email) {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
            if(err) { return reject(err); }

            if(rows.length < 0) { return resolve(null); }

            resolve(rows[0]);
        });
    });
}

async function setTimer() {
    let five_mins = 1000 * 60;
    let end = new Date(new Date().getTime() + five_mins);

    let timer = countdown.timer(end, function(timeLeft) {
    console.log(timeLeft.minutes +':' + timeLeft.seconds);
    if(timeLeft.minutes === 0 && timeLeft.seconds === 1) { timerDone = true; isTimerOngoing = false;}
    }, function() {
    console.log("Countdown Finished!");
    console.log("Is timer done? " + timerDone, "Is timer still ongoing? " + isTimerOngoing );
    })
}

module.exports.create = async function create(req, res) {
    if (!req.body) {
        return res.status(400).send({
            message: 'Fields cannot be empty'   
        });
    }

    let result = await findBySomething(req.body.email); 
    if(result) { 
        console.log("Email taken");
        return res.status(400).send("Email already taken"); 
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    User.create(user, (err,data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occured while creating an account'
            });
        else res.status(201).send(data);
    });
}

module.exports.login = async function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let result = await findBySomething(email);
    const user = { id: result.id, name: result.firstName};

    const match = await bcrypt.compare(password, result.password);
    console.log(match);
    // let secret = require('crypto').randomBytes(64).toString('hex');  
    
    if(!match && counter >= 4) {
        if(timerDone === false && isTimerOngoing === false) { await setTimer(); isTimerOngoing = true; timerDone = false;}            
        if(timerDone === true && isTimerOngoing === false) { timerDone = false; counter = 0; }
        if(timerDone === false && isTimerOngoing === true) { return res.send("Please log in again after 5 minutes"); }
    }
    if(match && counter < 5) {
        //create token
        const access_token = jwt.sign(user, process.env.TOKEN_SECRET);
        return res.header('auth-token', access_token).send(access_token);
    }
    return res.status(400).send("Invalid credentials " + counter++);
}


 
