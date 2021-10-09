
const Student = require('../models/student');
const Faculty = require('../models/faculty');
const envVariables =  require('../../config/env');
const Q = require('q');
const EmailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const ConfigAuth = {
    token : {
        secret : envVariables.config_secret
    }
}
const TokenTypes = {
    authToken : 'authToken'
}

const sendEmail = (email,context,subjectText)=>{
    var deferred = Q.defer();
    var transpoter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : envVariables.senderEmail,
            pass : envVariables.senderPassword
        }
    });
    var mailOptions = {
        from  : envVariables.senderEmail,
        to : email,
        subject : subjectText,
        html : context
    }
    transpoter.sendMail(mailOptions , function(err,info){
        if(err){
            console.log(err);
            deferred.reject(err.message);
        }else{
            console.log("Email Sent " + info.response);
            deferred.resolve(true);
        }
    })
    return deferred.promise;
}

const validateUserEmail = (email ,isStudent, checkForExistingUser)=> {
    var deferred = Q.defer();
    if(!EmailValidator.validate(email)){
        deferred.reject('Invalid Email Provided');
    }else{
        if(checkForExistingUser){
            if(isStudent){
                Student.findOne({
                    email : email
                },(err,user)=>{
                    if(err){
                        deferred.reject('Invalid Email Provided');
                    }else{
                        if(user){
                            deferred.reject('Existing User');
                        }else{
                            deferred.resolve(true);
                        }
                    }
                })
            }else{
                Faculty.findOne({
                    email : email
                },(err,user)=>{
                    if(err){
                        deferred.reject('Invalid Email Provided');
                    }else{
                        if(user){
                            deferred.reject('Existing Faculty Member');
                        }else{
                            deferred.resolve(true);
                        }
                    }
                })   
            }
        }else{
            deferred.resolve(true);
        }
    }
    return deferred.promise;
}


const validateToken = (token,tokenType)=>{
    var deferred = Q.defer();
    jwt.verify(token,ConfigAuth.token.secret,function(err,decoded){
        if(!err && decoded && (tokenType && tokenType === decoded.type)){
            deferred.resolve({isValid : true , payload : decoded});
        }else{
            deferred.reject(false);
        }
    })
    return deferred.promise;
}



const validateUser = (req,res,user,isFaculty)=>{
    validateToken(user.authToken , TokenTypes.authToken).then(response=>{
        if(response.isValid){
            res.status(200);
            return res.send(user);
        }
    }).catch(function(){
        user.authToken = jwt.sign({
            email :  user.email,
            isFaculty : isFaculty,
            type:TokenTypes.authToken
        },ConfigAuth.token.secret,{expiresIn : '10 days'});
        user.save(function(err){
            if(err){
                return res.status(400).send({error:err});
            }else{
                res.status(200);
                res.cookie('AccessToken',user.authToken,{
                    expires: new Date(Date.now() + 172800000),
                });
                return res.send(user);
            }
        })
    })
}



const checkForLoggedInUser = (req,res)=>{
    try{
        if(req.user){
            let user = req.user;
            res.status(200);
            return res.json(user);
        }else{
            res.status(400);
            return res.send({error : 'Not LoggedIn'});
        }
    }catch(err){
        return res.status(400).send({error : err});
    }
}

const isAdmin = (req,res,next)=>{
    if(req.user){
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(408).send({error : 'Access Forbidden !'})
        }
    }else{
        return res.status(400).send({error : 'Login First!'});
    }
}

const isAuthenticatedUser=(req)=>{
    var deferred = Q.defer();
    this.validateToken(req.headers.accesstoken,TokenTypes.authToken).then(response=>{
        if(response.isValid){
            req.user = response.payload;
            if(!response.payload.isFaculty){
                Student.findOne({email : req.user.email.toLowerCase()}).lean().then(user=>{
                    if(!user){
                        deferred.reject(false);
                    }else{
                        req.user = user;
                        deferred.resolve(true);
                    }
                }).catch(err=>{
                    deferred.reject(false);
                })
            }else{
                Faculty.findOne({email : req.user.email.toLowerCase()}).lean().then(user=>{
                    if(!user){
                        deferred.reject(false);
                    }else{
                        req.user = user;
                        deferred.resolve(true);
                    }
                }).catch(err=>{
                    deferred.reject(false);
                })
            }

        }else{
            deferred.resolve(false);
        }
    }).catch(err=>{
        deferred.resolve(false);
    })
    return deferred.promise;
}

module.exports = {
    checkForLoggedInUser,
    validateUser,
    validateToken,
    validateUserEmail,
    isAdmin,
    isAuthenticatedUser
}