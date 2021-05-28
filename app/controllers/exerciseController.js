sql = require('mysql');
const Exercise = require('../models/Exercise');

module.exports.getExercises = async function getExercises(req, res) {
    Exercise.findAll((err,data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occured'
            });
        else res.status(200).send(data);
    });   
}