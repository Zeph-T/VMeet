import React, { useContext,useRef,useEffect,useState } from 'react';
import {Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css'
import WrappedButton from './common/WrappedButton';
import { Dialog , DialogActions, DialogContent , DialogContentText , DialogTitle } from '@material-ui/core';
import {Button} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { api } from '../utilities';
import axios from 'axios';


const options = {
  headers : {
      "Content-Type" : "application/json",
      "AccessToken" : localStorage.getItem("AccessToken")
  }
}
const Navbar = (props) => {
  const searchModal = useRef(null)
  const {state,dispatch} = useContext(UserContext)
  const [userData,setuserData]=useState([])
  const [search,setSearch] = useState('')
  const [open , setOpen] = useState(false);
  const [openLogout , setopenLogout] = useState(false);
  const [joiningInProgress , setJoiningInProgess] = useState(false);
  const [logoutInProgress , setLogoutInProgress] = useState(false);
  const [newSubject , setnewSubject] = useState("");
  const [createInProgress , setCreateInProgress] = useState(false);
  const [openCreateDialog , setOpenCreateDialog] = useState(false);
  const [code,setCode] = useState("");
  const history = useHistory()
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])
  const renderList = () =>{
    if(state){
      return (
        <div>
        {
          !state.isAdmin ? <li key="4"><button className="btn #000 red darken-1" onClick={()=>setOpen(true)}> JOIN CLASS</button></li> : <li key="4"><button className="btn #000 red darken-1" onClick={()=>setOpenCreateDialog(true)}>CREATE CLASS</button></li>
        }
        <li key="5"><button 
        className="btn #e53935 red darken-1"
        onClick={()=>{
          setopenLogout(true)
        }}
        >  Logout
        </button></li>
        </div>
      )
    }else{
      return[
        <li key="6"><Link className="navbaroptions" to="/signin">Signin</Link></li>,
      <li key="7"><Link className="navbaroptions" to="/signup">Signup</Link></li>
      ]
      
    }
  }

  let logout = () => {
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/signin')
    window.location.reload()
  }

  const joinClass = () => {
    setJoiningInProgess(true);
    const data = {
      classCode : code
    };
    if(code.length === 5){
      axios.post(api.BASE_URL + api.JOIN_SUBJECT_URL,data,options).then((response)=>{
        setJoiningInProgess(false);
        setOpen(false);
        props.openSnackBar("Joined Succesfully!");
      }).catch(err=>{
        setJoiningInProgess(false);
        props.openSnackBar(err);
      })
    }else{
      setJoiningInProgess(false);
      props.openSnackBar("The Subject Code will be exact 5 characters!");
    }
  }

  const createSubject = () => {
    setCreateInProgress(true);
      if(newSubject.length >= 6){
        let data  = {
          name : newSubject
        };
        console.log("hi");
        console.log(options);
        axios.post(api.BASE_URL + api.CREATE_SUBJECT_URL,data,options).then((response)=>{
          console.log(response);
          props.openSnackBar('Subject created Successfully');
          setCreateInProgress(false);
          setOpenCreateDialog(false);
        }).catch(err=>{
          setCreateInProgress(false);
          props.openSnackBar(err.stack);
          setOpenCreateDialog(false);
        })
      }else{
        setCreateInProgress(false);
        props.openSnackBar('Subject name should consists a minimum of 6 characters');
        setOpenCreateDialog(false);
      }
  }

    return (   
      <div>
  <nav>
  <div className="nav-wrapper" style={{backgroundColor:'#091353'}} >
    <Link style={{
      padding:"0px 0px 0px 20px", color:"white !important"}}
       to={state?"/":"/signin"} className="brand-logo left">V-meet</Link>
    <ul id="nav-mobile" className="right">
      {renderList()}
    </ul>
  </div>
    <Dialog style={{maxWidth : '600'}} open={open} onClose={()=>{setOpen(false); setCode("")}} >
        <DialogTitle>JOIN CLASS</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Classroom Code provided by the Faculty</DialogContentText>
          <TextField
             autoFocus
             margin="dense"
             id="code"
             label="Subject Code"
             type="text"
             fullWidth
             value={code}
             onChange={(event)=>setCode(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)} color="secondary">
            Cancel
          </Button>
          <WrappedButton name="join" disabled={joiningInProgress} onClick={joinClass} />
        </DialogActions>
      </Dialog>
      <Dialog style={{maxWidth : '600'}} open={openCreateDialog} onClose={()=>{setOpenCreateDialog(false); setCode("")}} >
        <DialogTitle>CREATE CLASS</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Name of the Subject you want to create</DialogContentText>
          <TextField
             autoFocus
             margin="dense"
             id="code"
             label="Subject Name"
             type="text"
             fullWidth
             value={newSubject}
             onChange={(event)=>setnewSubject(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenCreateDialog(false)} color="secondary">
            Cancel
          </Button>
          <WrappedButton name="create" disabled={createInProgress} onClick={createSubject} />
        </DialogActions>
      </Dialog>
      <Dialog style={{maxWidth : '600'}} open={openLogout} onClose={()=>{setopenLogout(false); setCode("")}} >
        <DialogTitle>LOGOUT</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setopenLogout(false)} color="secondary">
            Cancel
          </Button>
          <WrappedButton name="logout" disabled={logoutInProgress} onClick={logout} />
        </DialogActions>
      </Dialog>
</nav>
      </div>  

    )

}

export default Navbar