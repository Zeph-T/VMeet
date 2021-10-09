import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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


export default mongoose.model('Faculty',FacultySchema);