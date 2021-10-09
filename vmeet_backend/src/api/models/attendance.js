const mongoose = require('mongoose');



const AttendanceSchema = mongoose.Schema({
    date : {
        type:Date
    },
    subjectId : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject'
    },
    attendees : [{
        _id : {
            type:mongoose.Types.ObjectId,
            ref : 'Student'
        },
        duration : {
            type:Date
        }
    }]
})

module.exports = mongoose.model('Attendance',AttendanceSchema);