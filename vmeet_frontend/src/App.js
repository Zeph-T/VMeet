import React, { useEffect, createContext, useReducer, useContext } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/Home'
import Signin from './components/Signin'
// import Profile from './components/Profile';
import Signup from './components/Signup'
// import CreatePost from './components/CreatePost';
// import UserProfile from './components/UserProfile';
import { reducer, initialState } from './reducer/UserReducer'
import Verification from './components/verification'
import Video from './components/video'
import { api,options } from './utilities'
import DetailScreen from './components/DetailScreen'
import axios from 'axios';
import CustomSnackBar from './components/common/SnackBar'
// import Allfollowpost from './components/Allfollowpost'

export const UserContext = createContext()

const Routing = (props) => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(async () => {
    console.log(options);
    console.log('hi');
    const user = await axios.get(api.BASE_URL + api.CHECK_FOR_LOGGED_IN_USER ,options);
    if (user.data) {
      dispatch({ type: 'USER', payload: user.data })
    } else {
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path='/' render={(props)=><Home  {...props}/>} />
      <Route exact path='/signin' render={(props)=><Signin  {...props}/>} />
      <Route exact path='/signup' render={(props)=><Signup  {...props}/>} />
      <Route exact path='/meet/:subjectId' render={(props)=><Verification  {...props}/>} />
      <Route exact path='/subject/:subjectId' render={(props)=> <DetailScreen {...props} />} />
      <Route exact path='/join/:subjectId' render={(props)=><Video props {...props}/>} />
    </Switch>
  )
}
function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const oSnackBar = React.createRef();
  let openSnackBar = (message) => {
    if(oSnackBar.current){
      oSnackBar.current.openSnackBar(message);
    }
  }
  
  let closeSnackBar = () => {
    if(oSnackBar.current){
      oSnackBar.current.closeSnackBar();
    }
  }
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar {...props} openSnackBar={openSnackBar}/>
        <Routing openSnackBar={openSnackBar} {...props}/>
        <CustomSnackBar ref={oSnackBar} />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
