const sql = require('./db.js');
const { DateTime } = require('luxon');

const User = require('./User.js');

class Routine {
    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.duration = data.duration;
        this.createdBy = new User(data.createdBy);
        this.createdDate = DateTime.fromJSDate(data.createdDate);
    }
}

//add exercise