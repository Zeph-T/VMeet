import React, { useEffect, useState } from "react";
import http from "./services/httpService";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { server_url } from "./config.json";
import Auth from "./components/Auth/Auth";
import Logout from "./components/Auth/Logout";
import Register from "./components/Auth/register";
import Activate from "./components/Auth/Activation";
import Navbar from "./components/Navbar/navbar";
import Product from "./components/Product/Product";
import CustomSnackBar from "../src/components/common/SnackBar";
import "./App.css";
import Search from "./components/Search/Search";
import { api } from "./utilities";
import SelectPage from "./components/Home/Selectpage";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from './components/Home/profile'

function App(props) {
  const [user, setUser] = useState({}); // to save user details.
  const oSnackBar = React.createRef();

  let openSnackBar = (message) => {
    if (oSnackBar.current) {
      oSnackBar.current.openSnackBar(message);
    }
  };

  let closeSnackBar = () => {
    if (oSnackBar.current) {
      oSnackBar.current.closeSnackBar();
    }
  };
  useEffect(() => {
    // this function checks if the user is logged in and store details of user object.
    async function Start() {
      const jwt = localStorage.getItem("token");
      if (jwt) {
        http
          .get(api.BASE_URL + api.CHECK_FOR_LOGGED_IN_USER, {
            headers: { accesstoken: jwt },
          })
          .then((oUser) => {
            if (oUser) {
              setUser(oUser.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if(props.location.pathname !=="/resetPassword"){
        props.history.push("login");
      }
    }
    Start();
  }, []);
  return (
    <BrowserRouter basename="/">
      {user && user._id && !['/resetPassword','/login'].includes(props.location) && <Navbar openSnackBar={openSnackBar} user={user} {...props} /> }
      <Switch>
        {/* All the routes are handled here */}
        <Route path="/login" render={(props)=><Auth openSnackBar={openSnackBar} {...props}/> } />
        <Route path="/register" render={(props)=><Register openSnackBar={openSnackBar} {...props}/> }  />
        <Route path="/activateUser" render={(props)=> <Activate {...props} />} />
        <Route
          path="/product/:id"
          render={(props) => <Product openSnackBar={openSnackBar} {...props} user={user} />}
        />
        <Route exact path='/resetPassword' render={(props)=><ResetPassword  openSnackBar={openSnackBar}  {...props} />}/>
        <Route path="/logout" exact component={Logout} />
        <Route path="/search" exact component={Search} />
        <Route path='/profile' render={(props)=> <Profile openSnackBar={openSnackBar} user={user} {...props}/>} />
        <Route path="/" exact component={SelectPage} />
      </Switch>
      <CustomSnackBar ref={oSnackBar} />
    </BrowserRouter>
  );
}

export default App;