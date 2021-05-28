const users = require("../controllers/userController");
const exercises = require("../controllers/exerciseController");
const routine = require("../controllers/routineController");

module.exports = app => {

    //creates a new user
    app.post('/register', users.create);
    //render register
    app.get('/register', (req, res) => {
        res.render('register.ejs');
    });

    //logs in user
    app.post('/login', users.login);
    //render login
    app.get('/login', (req, res) => {
        res.render('login.ejs');
    });

    app.get('/exercises', (req,res,next) => {
        next();
    }, exercises.getExercises);
    
    // app.get('/routine', routine.getRoutines);
    // app.post('/routine', routine.addRoutine);
}