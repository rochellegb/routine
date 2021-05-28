const sql = require('./db.js');

//constructor
const Exercise = function(exercise) {
    this.id = exercise.id;
    this.name = exercise.name;
    this.duration = exercise.duration;
};

Exercise.findAll = (result) => {
    sql.query("SELECT * FROM exercises", (err, rows) => {
    if(err) {
        result(err,null)
        return err;
    }
    result(null, rows);
    return rows;
    })
};

module.exports = Exercise;