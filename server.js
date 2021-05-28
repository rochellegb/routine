require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view-engine', 'ejs');

app.use(function (err, req, res, next){
    if(err) { return err; }
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if(token == null) { return res.status(401); }

    jwt.verify(token, process.env.TOKEN_SECRET, (err,res) => {
        if(err){ return res.status(403); }
        req.user = user;
        next();
    });
    console.log(user);
    
})

require("./app/routes/user.routes.js")(app);



app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});