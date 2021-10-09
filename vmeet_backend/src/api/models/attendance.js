const mongoose = require('mongoose');



const AttendanceSchema = mongoose.Schema({
    date : {
        type:Date
    },
    subjectId : {
        type : mongoose.Types.ObjectId,
        ref : 'Subject'
    },
    facultyId : {
        type :  mongoose.Types.ObjectId,
        ref : 'Faculty'
    },
    studentsAttended : [{
        type:mongoose.Types.ObjectId,
        ref : 'Student'
    }]
})

module.exports = mongoose.model('Attendance',AttendanceSchema);