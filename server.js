require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const { json } = require('express');
const jwt = require('jsonwebtoken');

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    // if(err) { return err; }
    const authHeader = req.headers['authorization'];
    // console.log(JSON.stringify(req.headers));
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token: " + token);

    if(!token) { return res.status(401); }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, res) => {
        if(err) { 
            return res.status(403); 
        }
        req.user = res;
        console.log(req.user);
        next();
    });
});
app.set('view-engine', 'ejs');
require("./app/routes/user.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});
