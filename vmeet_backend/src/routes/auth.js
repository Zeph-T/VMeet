const StudentController = require('../api/controllers/Student');
const FacultyController = require('../api/controllers/Faculty');

module.exports = (router) => {
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : 'Up and Running'});
    });
    router.post('/studentsignup',StudentController.signup);
    router.post('/studentlogin',StudentController.login);
    router.post('/facultysignup',FacultyController.signup);
    router.post('/facultylogin',FacultyController.login);
}