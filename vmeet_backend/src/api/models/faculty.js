const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const FacultySchema = mongoose.Schema({
    name : {
        type:String
    },
    email  : {
        type : String,
        lowercase : true
    },
    authToken : {
        type:String,
        default :  ""
    },
    password  : {
        type:String
    },
    isAdmin : {
        type:Boolean,
        default : true
    },
    photoUrl : {
        type:String,
        required:true
    }
})


FacultySchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

FacultySchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}


module.exports =  mongoose.model('Faculty',FacultySchema);