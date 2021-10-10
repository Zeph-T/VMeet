import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
import { api } from "../utilities";
import ReactLogo from "../svgs/homePage.svg";
import axios from "axios";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import WrappedButton from "./common/WrappedButton";
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { FormGroup } from "@material-ui/core";

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));


const SignIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loginIsInProgress, setLoginIsInProgress] = useState(false);
    const PostData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email
            )
        ) {
            M.toast({ html: "invalid Email", classes: "#43a047 red darken-1" });
            return;
        }
        setLoginIsInProgress(true);
        if (isAdmin) {
            axios
                .post(api.BASE_URL + api.FACULTY_LOGIN_URL, {
                    email: email,
                    password: password,
                })
                .then((data) => {
                    if (data.data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" });
                    } else {
                        localStorage.setItem("AccessToken", data.data.authToken);
                        dispatch({ type: "USER", payload: data.data });
                        M.toast({
                            html: "signed in successfully",
                            classes: "#43a047 green darken-1",
                        });
                        history.push("/");
                    }
                    setLoginIsInProgress(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .post(api.BASE_URL + api.STUDENT_LOGIN_URL, {
                    email: email,
                    password: password,
                })
                .then((data) => {
                    if (data.data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" });
                    } else {
                        localStorage.setItem("AccessToken", data.data.authToken);
                        dispatch({ type: "USER", payload: data.data });
                        M.toast({
                            html: "signed in successfully",
                            classes: "#43a047 green darken-1",
                        });
                        history.push("/");
                    }
                    setLoginIsInProgress(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <div
            style={{ display: "flex", justifyContent: "space-around", padding: '5rem' }}
        >
            <div className="mycard">
                <div className="card auth-card input-field col s12 m6">
                    <h2 className="instafamheading" style={{ margin: '0 6.5rem' }}>V-meet</h2>

                    <div class="input-field col s12" style={{ margin: '0, 3rem' }} >
                        <input
                            type="text"
                            value={email}
                            style={{ color: '#091353', fontWeight: '600', }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="email" style={{ color: '#091353', fontWeight: '600' }}>Email</label>
                    </div>

                    <div class="input-field col s6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label for="password" style={{ color: '#091353', fontWeight: '600' }}>Password</label>
                    </div>


                    <Grid
                        item
                        xs={12}
                        md={12}
                        spacing={1}
                        style={{ display: "flex", flexDirection: "row" }}
                    >
                        <Grid item style={{ margin: "1rem" }}>
                            {" "}
                            Student
                        </Grid>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                            onChange={() => setIsAdmin(!isAdmin)}
                            name='isAdmin'
                        />
                        <Grid item style={{ marginTop: "1rem" }}>
                            Faculty
                        </Grid>
                    </Grid>
                    <WrappedButton
                        key="loginButton"
                        buttonKey="loginButton"
                        disabled={loginIsInProgress}
                        variant="contained"
                        onClick={PostData}
                        name="Login"
                        size="large"
                        style={{ width: "100%", padding: "0.8rem", backgroundColor: '#081044', color: 'white', fontWeight: '600', }}
                        icon=""
                    />
                    <h6>
                        <Link style={{ color: '#081044' }} to="/signup">Don't have an account ?</Link>
                    </h6>
                </div>
            </div>
            <img
                src={ReactLogo}
                alt="React Logo"
                style={{ width: "600px", height: "auto", margin: "3rem 1rem", padding: '2rem' }}
            />
        </div>
    );
};

export default SignIn;
