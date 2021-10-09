const Subject = require('../models/subject');
const Student = require("../models/student");
const Faculty = require('../models/faculty');
const {getAnnouncements} = require('./announcement');
const Q = require('q');
const mongoose = require('mongoose');

const joinSubject = (req,res)=>{
    try{
        Subject.findOne({classCode : req.body.classCode,isValid : true}).then(oSub=>{
            if(oSub){
                Student.findOneAndUpdate({_id :req.user._id},{$push : { activeClasses : oSub._id }},{new : true}).then(oUser=>{
                    oSub.Students.push(req.user._id);
                    oSub.save((err,doc)=>{
                        if(err){
                            throw err;
                        }else{
                            return res.status(200).send(doc);
                        }
                    })
                }).catch(err=>{
                    return res.status(400).send({error : err.stack});
                })
            }else{
                throw 'Subject Doesn`t exist';
            }
        }).catch(err=>{
            return res.status(400).send({error : err});
        })
    }catch(err){
        return res.status(400).send({error : err});
    }
}

const getSubjectDetail=(subjectId)=>{
    let deferred = Q.defer();
    try{
        Subject.findById(mongoose.Types.ObjectId(subjectId)).then(oSub=>{
            deferred.resolve(oSub);
        })
    }catch(err){
        deferred.reject(err.stack);
    }
    return deferred.promise;
}


const createSubject = (req,res)=>{
    try{    
        if(req.body && req.body.name){
            let newSubject  = new Subject;
            newSubject.name = req.body.name;
            newSubject.faculty = [];
            newSubject.facultyNames = [];
            newSubject.faculty.push(mongoose.Types.ObjectId(req.user._id));
            newSubject.facultyNames.push(req.user.name);
            newSubject.save(err=>{
                if(err){
                    return res.status(400).send({error : err});
                }else{
                    Faculty.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.user._id)},{$push : {teachingSubjects : mongoose.Types.ObjectId(newSubject._id)}},(err,doc)=>{
                        if(err){
                            return res.status(400).send({error : err.stack});
                        }else{
                            return res.status(200).send(newSubject);
                        }
                    });
                }
            })
        }else{
            return res.status(400).send({error : 'Add Payload Data!'});
        }
    }catch(err){    
        return res.status(400).send({error : err.stack});
    }
}

const getSubjectData = (req,res)=>{
    try{
        let getAllAnnouncementsPromise = getAnnouncements(req.params.subjectId);
        let getSubjectDataPromise  = getSubjectDetail(req.params.subjectId);
        Q.all([getAllAnnouncementsPromise,getSubjectDataPromise]).then(data=>{
            return res.status(200).send({
                announcements : data[0],
                name : data[1].name,
                classCode : data[1].classCode,
                faculty : data[1].facultyNames
            })
        }).catch(err=>{
            return res.status(400).send({error : err});
        })
    }catch(err){
        return res.status(400).send({error: err});
    }
}



module.exports = {
    getSubjectData,
    createSubject,
    joinSubject
}