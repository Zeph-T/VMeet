import React,{useState} from 'react';

import Button from '@material-ui/core/Button';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Visbility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField"
import Slide from '@material-ui/core/Slide';
import WrappedButton from '../common/WrappedButton';
import Logo from '../../images/logo.png';
import { useDispatch } from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as facultyActions from '../../actions/facultyActions';

function LoginPage(props){
    const dispatch = useDispatch();
    const {classes,theme} =  props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [showPassword , setShowPassword] = useState(false);
    const [loginIsInProgress, setLoginIsInProgress] = useState(false);

    let redirectToHomePage =() => {
        props.history.push('/home');
    }

    let loginUser = () => {               
        setLoginIsInProgress(true);
        let data = {
            email : email,
            password : password
        }
        if(isAdmin){
            dispatch(facultyActions.login(data)).then(result=>{
                localStorage.setItem("AccessToken",result.authToken);
                dispatch(userActions.getTeachingSchedule()).then(() => {
                })
                dispatch(userActions.getMyTeachingSubjects()).then(() => {
                })
                props.openSnackBar("Login Success!");
                setLoginIsInProgress(false);
                redirectToHomePage();
                window.location.reload()
            }).catch(err=>{
                setLoginIsInProgress(false);
                props.openSnackBar(err.stack);
            })
        }else{
            dispatch(userActions.login(data)).then(result=>{
                localStorage.setItem("AccessToken",result.authToken);
                    dispatch(userActions.getStudentSchedule()).then(() => {
                    })
                    dispatch(userActions.getMySujects()).then(() => {
                    })
                    dispatch(userActions.getUpcomingAssignments()).then(()=>{
                    })
                setLoginIsInProgress(false);
                redirectToHomePage();
                window.location.reload();
            }).catch(err=>{
                setLoginIsInProgress(false);
                props.openSnackBar(err.stack);
            })
        }
    }
    let redirectToSignupUpPage = () => {
        props.history.push('/signup');
    }

    let handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    let handleMouseDownPassword = (event) =>{
        event.preventDefault();
    }
    return (
        <div>
            <form className="loginForm" noValidate autoComplete="off" key="loginForm">
                <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                    <Paper style={{padding : "2rem"}}>
                        <Grid container spacing={2} style={{marginTop : 10}}>
                            <div style={{width : '100%',textAlign : 'center'}}>
                                <img style={{maxWidth : '8rem' , width : '100%' , textAlign : 'right'}} src={Logo} />
                                <h4 style={{margin : '1.5rem'}}>Login to your acccount</h4>
                            </div>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    // className={classes.formControl}
                                    style={{paddingTop : '0rem'}}
                                    fullWidth
                                    required
                                    label="Email"
                                    autoComplete="Email"
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={(text)=>setEmail(text.target.value)}
                                    variant="outlined"
                                    helperText=""
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    className={classes.formControl}
                                    fullWidth
                                    required
                                    type={!showPassword ? "password" : "text"}
                                    label="Password"
                                    autoComplete="Password"
                                    name="password"
                                    value={password}
                                    onChange={(text)=>setPassword(text.target.value)}
                                    variant="outlined"
                                    helperText=""
                                    onKeyPress={(oEvent)=>{
                                        if(oEvent.key === "Enter"){
                                          loginUser();
                                        }
                                      }}        
                                    InputProps={{
                                        endAdornment : (
                                            <InputAdornment position="end" style={{marginLeft : "3rem"}}>
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visbility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {/* <FormControl className={classes.formControl} fullWidth variant="outlined" >
                                    <InputLabel>Password</InputLabel>   
                                <Input
                                    id="passwordu"
                                    className={classes.formControl}
                                    fullWidth
                                    variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(text)=>setPassword(text.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end" style={{marginLeft : "3rem"}}>
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visbility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }
                                />
                                </FormControl> */}
                            </Grid>
                            <Grid item xs={12} md={12} spacing={1} style={{display:'flex' , flexDirection : 'row'}}>
                                <Grid item style={{margin : '1rem'}}> Student</Grid>
                                <FormControlLabel 
                                    control={<Switch size="normal" color="none"  onChange={()=>setIsAdmin(!isAdmin)} name="isAdmin"/>}
                                />
                                <Grid item style={{marginTop : '1rem'}}>Faculty</Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                    <WrappedButton 
                                        key="loginButton"
                                        buttonKey="loginButton"
                                        disabled={loginIsInProgress}
                                        variant="contained"
                                        color="primary"
                                        onClick={(loginUser)}
                                        name="Login"
                                        classes={classes}
                                        size="large"
                                        style={{width : "100%",padding: "0.8rem"}}
                                        icon = ""
                                    />
                            </Grid>
                            <Grid item xs={12} style={{marginTop : "0.5rem" , fontSize : "0.8rem"}}>
                                    <h5 style={{textAlign : 'center',cursor : 'pointer'}}>
                                        Don't Have a SkillKits Account? <span> <Link color="primary" onClick={()=>redirectToSignupUpPage()}>Sign Up Here! </Link> </span>
                                    </h5>
                            </Grid>
                        </Grid>
                    </Paper>
                </Slide>
            </form>
        </div>
    )
}


export default withStyles({})(LoginPage);