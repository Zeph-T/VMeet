import React,{useState} from 'react';
import { withRouter } from 'react-router';
import { withStyles,withTheme } from '@material-ui/styles';



import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Visbility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import WrappedButton from '../common/WrappedButton';
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Logo from '../../images/logo.png'

import * as userActions from '../../actions/userActions';
import * as facultyActions from '../../actions/facultyActions'

const SignUpPage = (props) => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [name ,setName] = useState("");
    const [sigUnUpInProgress, setSignUpInProgress] = useState(false);
    const [isAdmin , setIsAdmin] = useState(false);
    const [showPassword , setShowPassword] = useState(false);
    let redirectToLoginPage = () => {
        props.history.push('/login');
    }
    let handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    let handleMouseDownPassword = (event) =>{
        event.preventDefault();
    }

    let signUpUser = () => {
        setSignUpInProgress(true);
        let data = {
            name  : name,
            email : email,
            password : password
        }
        //add action
        if(!isAdmin){
            userActions.signup(data).then(result =>{
                console.log(result);
                setSignUpInProgress(false);
                props.openSnackBar(result.message);
            }).catch(err=>{
                console.log(err);
                setSignUpInProgress(false);
                props.openSnackBar(err)
            })
        }else{
            facultyActions.signup(data).then(result=>{
                props.openSnackBar(result.message);
                setSignUpInProgress(false);
            }).catch(err=>{
                props.openSnackBar(err);
                setSignUpInProgress(err);
            })
        }
    }
    const {classes , theme} = props;
    return [
        <div>
            <form noValidate Autocomplete="off" key="signUpForm" className="signupForm">
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Paper style={{padding : '1.5rem' , marginBottom:"0.5rem"}}>
                        <Grid container spacing={2} style={{marginTop : 10}}>
                        <div style={{width : '100%' , textAlign : 'center'}}>
                            <img style={{maxWidth : '8rem' , width : '100%' , textAlign : 'right'}} src={Logo} />
                            <h4 style={{margin : '1.5rem'}}>Sign Up for New User</h4>
                        </div>
                        <Grid item xs={6} md={12}>
                            <TextField 
                                id="sfname"
                                className={classes.formControl}
                                fullWidth
                                required
                                label="User Name"
                                Autocomplete="userName"
                                name="uname"
                                type="text"
                                value={name}
                                onChange={(text)=> setName(text.target.value)}
                                variant="outlined"
                                helperText=""
                            />
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <TextField 
                                id="email"
                                className={classes.formControl}
                                fullWidth
                                required
                                label ="Email ID"
                                Autocomplete="email"
                                name="email"
                                value={email}
                                onChange={(text)=>setEmail(text.target.value)}
                                helperText=""
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <TextField 
                                id="passowrd"
                                className={classes.formControl}
                                fullWidth
                                required
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                Autocomplete="email"
                                name="password"
                                value={password}
                                onChange={(text)=>setPassword(text.target.value)}
                                helperText = ""
                                variant="outlined"
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
                                        disabled={sigUnUpInProgress}
                                        variant="contained"
                                        color="primary"
                                        onClick={signUpUser}
                                        name="Sign Up"
                                        classes={classes}
                                        size="large"
                                        style={{width : "100%",padding: "0.8rem"}}
                                        icon = ""
                                    />
                            </Grid>
                            <Grid item xs={12} style={{marginTop : "0.5rem" , fontSize : "0.8rem"}}>
                                    <h5 style={{textAlign : 'center',cursor : 'pointer'}}>
                                    Already Have a SkillKits Account? <span> <Link color="primary" onClick={()=>redirectToLoginPage()}>Login Here! </Link> </span>
                                    </h5>
                            </Grid>
                        </Grid>
                    </Paper>
                </Slide>
            </form>
        </div>
    ]
}


export default withStyles({})(SignUpPage);