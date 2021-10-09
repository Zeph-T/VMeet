const Student = require('../models/student');
const {validateUser,validateUserEmail} = require('./apiHelper');
const axios = require('axios');
const signup = (req,res)=>{
    try{
        let userInfo = req.body;
        userInfo.email = userInfo.email.toLowerCase();
        if(!userInfo.email || !userInfo.password || !userInfo.name || userInfo.password.length<8){
            if(userInfo.password.length < 8){
                res.status(422);
                return res.send({error:"Password Too Short"});
            }else{
                res.status(400);
                return res.send({error :"Required Fields Error"});
            }
        }
        axios.get(`https://open.kickbox.com/v1/disposable/${userInfo.email}`).then(function (response) {
                return response.data;
            }).then(function(isDisposedData){
                if(!isDisposedData.disposable){
                    validateUserEmail(userInfo.email,true,true).then(isValid=>{
                        if(isValid){
                            let newStudent = new Student;
                            newStudent.name = userInfo.name;
                            newStudent.email = userInfo.email;
                            newStudent.photoUrl = userInfo.photoUrl;
                            newStudent.password = newStudent.generateHash(userInfo.password);
                            newStudent.save(function(err){
                                if(err){
                                    return res.status(400).send({error:err.stack});
                                }else{
                                    // return Email(userInfo.email,emailContexts.WELCOME).then((isValid)=>{
                                    //     res.status(200).send({message : 'User Created!'});
                                    // }).catch(err=>{
                                    //     return res.status(400).send({error : err.stack});
                                    // })
                                    res.status(200).send({message : 'User Created!'});
                                }
                            })
                        }else{
                            return res.status(408).send({error : 'Cannot create an Email with this Email!'})
                        }
                    }).catch(err=>{
                        return res.status(400).send({error : err.stack});
                    })
                }else{
                    return res.status(500).send({error : 'Error Saving the info!'});
                }
            }).catch(err=>{
                return res.status(400).send(err.stack);
            })
    }catch(err){
        return res.status(400).send(err.stack);
    }
}

const login = (req,res)=>{
    try{
        let userInfo = req.body;
        if(!userInfo || !userInfo.email || !userInfo.password){
            return res.status(400).send({error : 'Missing Fields!'});
        }
        Student.findOne({
            email : userInfo.email
        }).then(user=>{
            if(!user){
                return res.status(404).send({error : 'Email Id not found!'});
            }
            if(user.validPassword(userInfo.password)){
                validateUser(req,res,user,false);
            }else{
                return res.status(404).send({error:'Password Invalid!'});
            }
        }).catch(err=>{
            console.log(err);
            return res.status(400).send({error : err.stack});
        })
    }catch(err){
        return res.status(400).send({error : err.stack});
    }
}



module.exports = {
    login,
    signup
}