import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const studentSchema = mongoose.Schema({
    name : {type:String},
    email : {
        type:String,
        lowercase : true
    },
    password : {type: String},
    authToken : {
        type:String,
        default :  ""
    },
    activeClasses : [{
        type:mongoose.Types.ObjectId,
        ref : 'Subject'
    }],
    isAdmin  : {
        type:Boolean,
        default : false
    },
    photoUrl : {
        type:String,
        required: true
    }
})


studentSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

studentSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

export default mongoose.model('Student',studentSchema);