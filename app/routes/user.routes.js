module.exports = app => {
    const users = require("../controllers/userController");
    const exercises = require("../controllers/exerciseController");
    const routine = require("../controllers/routineController");

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

    app.get('/routine', (req, res) => {
        
    });
    // app.post('/routine', routine.getHomePage);
}