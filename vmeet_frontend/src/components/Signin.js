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
    if(isAdmin){
        axios
        .post(api.BASE_URL + api.FACULTY_LOGIN_URL, {
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.data.error) {
            M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          } else {
            localStorage.setItem("jwt", data.data.authToken);
            localStorage.setItem("user", JSON.stringify(data.data));
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
    }else{
        axios
      .post(api.BASE_URL + api.STUDENT_LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((data) => {
        if (data.data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          localStorage.setItem("jwt", data.data.authToken);
          localStorage.setItem("user", JSON.stringify(data.data));
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
      style={{ display: "flex", justifyContent: "center", margin: "2rem 0rem" }}
    >
      <div className="mycard">
        <div className="card auth-card input-field">
          <h2 className="instafamheading">V-meet</h2>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
              control={
                <Switch
                  size="small"
                  color="none"
                  onChange={() => setIsAdmin(!isAdmin)}
                  name="isAdmin"
                />
              }
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
            color="primary"
            onClick={PostData}
            name="Login"
            size="large"
            style={{ width: "100%", padding: "0.8rem" }}
            icon=""
          />
          <h5>
            <Link to="/signup">Don't have an account ?</Link>
          </h5>
        </div>
      </div>
      <img
        src={ReactLogo}
        alt="React Logo"
        style={{ width: "400px", height: "auto", margin: "3rem 5rem" }}
      />
    </div>
  );
};

export default SignIn;
