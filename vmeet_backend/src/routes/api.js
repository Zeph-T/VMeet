const apiHelper = require('../api/controllers/apiHelper');
const subjectApi = require('../api/controllers/subject');
const studentApi = require('../api/controllers/Student');

module.exports = (router) =>{
    router.use(function(req,res,next){
        apiHelper.isAuthenticatedUser(req).then(isValid=>{
            if(isValid){
                next();
            }else{
                res.status(400);
                return res.send({error:'Auth Token Expired'});
            }
        }).catch(err=>{
            res.status(400);
            return res.send({error : err});
        })
    })
    router.get('/',(req,res)=>{
        res.status(200);
        // console.log("In / route",req.user);
        return res.send({message : "Working!"} );
    });
    router.get('/checkForLoggedInUser',apiHelper.checkForLoggedInUser);
    router.post('/joinSubject',subjectApi.joinSubject);
    router.post('/createSubject',apiHelper.isAdmin , subjectApi.createSubject);
    router.post('/postAnnouncement',apiHelper.isAdmin,announcementApi.AddAnouncement);
    router.get('/getSubjectData/:subjectId',subjectApi.getSubjectData);
    router.get('/getStudentSubjects',studentApi.getAllSubjects);
    router.get('/getFacultySubjects',apiHelper.isAdmin ,facultyApi.getAllSubjects);

}