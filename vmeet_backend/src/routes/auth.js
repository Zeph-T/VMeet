const StudentController = require('../api/controllers/Student');;


module.exports = (router) => {
    router.get('/',(req,res)=>{
        res.status(200);
        return res.json({status : 'Up and Running'});
    });
    router.post('/studentsignup',StudentController.signup);
    router.post('/studentlogin',StudentController.login);
}