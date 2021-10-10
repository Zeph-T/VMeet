import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css'
import { api } from '../utilities';
import { options } from '../utilities'
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReactLogo from "../svgs/homePage.svg";
import { styled } from '@mui/material/styles';

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

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const urlRef = useRef(null);
    const [isAdmin, setIsAdmin] = useState(false);


    const uploadProfilepic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Instafam")
        data.append("cloud_name", "abcd1234huy")
        fetch("https://api.cloudinary.com/v1_1/abcd1234huy/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                urlRef.current = data.url
                Fielddata()
            })
            .catch(err => {
                console.log(err)
            })

    }
    const Fielddata = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid Email", classes: "#43a047 red darken-1" })
            return
        }
        if (isAdmin) {
            fetch(api.BASE_URL + api.FACULTY_SIGNUP_URL, {
                method: "post",
                headers: options,
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    photoUrl: urlRef.current
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        history.push('/signin')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
        else {
            fetch(api.BASE_URL + api.STUDENT_SIGNUP_URL, {
                method: "post",
                headers: options,
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    photoUrl: urlRef.current
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        M.toast({ html: data.error, classes: "#e53935 red darken-1" })
                    }
                    else {
                        M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                        history.push('/signin')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }

    }

    const PostData = () => {
        if (image) {
            uploadProfilepic()
        } else {
            Fielddata()
        }

    }
    return (
        <div style={{ display: "flex", justifyContent: "space-around", padding: '5rem'}}>
            <div className="mycard" >
                <div className="card auth-card input-field">
                    <h2 className="instafamheading" style={{ margin: '0 6.5rem' }}>V-meet</h2>
                <div class="input-field col s12" style={{ margin: '0, 3rem' }} >
                    <input
                        type='text'
                        value={name}
                        style={{ color: '#091353', fontWeight: '600', }}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label for="text" style={{ color: '#091353', fontWeight: '600' }}>Name</label>
                </div>

                <div class="input-field col s12" style={{ margin: '0, 3rem' }} >
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                    <label for="text" style={{ color: '#091353', fontWeight: '600' }}>Email</label>
                </div>

                <div class="input-field col s12" style={{ margin: '0, 3rem' }} >
                <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                    <label for="text" style={{ color: '#091353', fontWeight: '600' }}>Password</label>
                </div>

               
                
                <Grid
                    item
                    xs={12}
                    md={12}
                    spacing={1}
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    <Grid item style={{ margin: "1rem",color:'#091353' }}>
                        {" "}
                        Student
                    </Grid>
                    <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} />}
                            onChange={() => setIsAdmin(!isAdmin)}
                            name='isAdmin'
                        />
                    <Grid item style={{ marginTop: "1rem",color:'#091353'  }}>
                        Faculty
                    </Grid>
                </Grid>

                <div className="file-field input-field">
                    <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
                        <span>Upload Profile Picture</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />

                    </div>
                </div>

                <button className="btn waves-effect waves-light #64b5f6 "
                    onClick={() => PostData()}
                    style={{ width: "100%", backgroundColor: '#081044', color: 'white', fontWeight: '600', }}
                >
                    SignUp
                </button>
                <h5>
                    <Link to="/signin" style={{ color: '#081044' }}>Already have an account ?</Link>
                </h5>

            </div>
        </div>
        <img
        src={ReactLogo}
        alt="React Logo"
        style={{ width: "600px", height: "auto", margin: " 1rem",padding:'2rem' }}
      />
      </div>
       
    );
};

export default Signup