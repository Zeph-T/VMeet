export const api = {
    BASE_URL : 'http://localhost:8000/',
    CHECK_FOR_LOGGED_IN_USER : "api/checkForLoggedInUser",
    STUDENT_LOGIN_URL : 'auth/studentlogin',
    FACULTY_LOGIN_URL : 'auth/facultylogin',
    STUDENT_SIGNUP_URL : 'auth/studentsignup',
    FACULTY_SIGNUP_URL : 'auth/facultysignup',
    JOIN_SUBJECT_URL : 'api/joinSubject',
    CREATE_SUBJECT_URL  : 'api/createSubject',
    POST_ANNOUNCEMENT_URL : 'api/postAnnouncement',
    POST_ASSIGNMENT_URL : 'api/postTestOrAssignment',
    GET_SUBJECT_DATA_URL : 'api/getSubjectData/',
    SCHEDULE_CLASS_URL  :'api/scheduleClass',
    SUBMIT_ASSIGNMENT_URL : 'api/submitAssignment',
    LOGOUT_URL  : 'auth/logout',
    GET_FACULTY_SCHEDULE_URL : 'api/getFacultySchedule',
    GET_STUDENT_SCHEDULE_URL  : 'api/getSchedule',
    GET_STUDENTS_SUBJECT_URL  : 'api/getStudentSubjects',
    GET_FACULTY_SUBJECT_URL : 'api/getFacultySubjects',
    GET_UPCOMING_ASSIGNMENTS_URL  : 'api/getUpcomingAssignments'
}

export const options = {
    "Content-Type" : "application/json",
    "AccessToken" : localStorage.getItem('AccessToken')
}