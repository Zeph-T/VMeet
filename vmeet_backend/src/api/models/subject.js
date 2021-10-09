const mongoose = require('mongoose');
const randtoken = require('rand-token');



const SubjectSchema = mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    classCode : {
        type:String,
        default : function(){
            return randtoken.generate(5)
        },
        unique : true
    },
    faculty : [{
        type:mongoose.Types.ObjectId,
        ref: 'Faculty'
    }],
    facultyNames : [{type:String}],
    Students : [{
        type:mongoose.Types.ObjectId,
        ref: 'Student'
    }],
    isValid : {
        type : Boolean,
        default : true
    }
})

module.exports =  mongoose.model('Subject',SubjectSchema);