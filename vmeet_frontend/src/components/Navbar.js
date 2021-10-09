import React,{useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Logo from '../../images/logo.png'
import AddIcon from '@material-ui/icons/Add';
import {Button, Link} from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useSelector ,useDispatch} from 'react-redux';
import WrappedButton from '../common/WrappedButton';
import { Dialog , DialogActions, DialogContent , DialogContentText , DialogTitle } from '@material-ui/core';
import * as userActions from '../../actions/userActions';
import * as facultyActions from '../../actions/facultyActions';

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const [open , setOpen] = useState(false);
  const [openLogout , setopenLogout] = useState(false);
  const [joiningInProgress , setJoiningInProgess] = useState(false);
  const [logoutInProgress , setLogoutInProgress] = useState(false);
  const [newSubject , setnewSubject] = useState("");
  const [createInProgress , setCreateInProgress] = useState(false);
  const [openCreateDialog , setOpenCreateDialog] = useState(false);
  const [code,setCode] = useState("");
  let logout = () => {
    setLogoutInProgress(true);
    localStorage.removeItem('AccessToken');
    dispatch(userActions.logoutUser()).then(()=>{
      setLogoutInProgress(false);
      setopenLogout(false);
      props.history.push('login');
    }).catch(err=>{
      props.openSnackBar(err.stack);
    })
  }
  const joinClass = () => {
    setJoiningInProgess(true);
    const data = {
      classCode : code
    };
    if(code.length === 5){
      dispatch(userActions.joinSubject(data)).then(()=>{
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
    if(user.isAdmin){
      if(newSubject.length > 6){
        let data  = {
          name : newSubject
        };
        dispatch(facultyActions.createSubject(data)).then(()=>{
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
  }

  return (
    <>
      <Navbar bg='light' collapseOnSelect>
        <Container>
          <LinkContainer to='/home'>
            <Navbar.Brand>  <img style={{maxWidth : '3rem' , width : '100%' , textAlign : 'right'}} src={Logo} /> SKILL KITS</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'> 
               {
                 user.isAdmin && <Link href="#" style={{margin:'auto' , textDecoration : 'none',marginRight : '1rem'}} color="inherit" variant="body2" onClick={()=> setOpenCreateDialog(true)} >
                 CREATE CLASS
               </Link>
               }
              <Link href="#" style={{width : 'auto', margin:'auto' , textDecoration : 'none',marginRight : '1rem'}} color="inherit" variant="body2" onClick={()=> setOpen(true)} >
                JOIN CLASS
              </Link>
              <Link href="#" style={{margin:'auto' , textDecoration : 'none',marginRight : '1rem'}} color="inherit" variant="body2" onClick={()=> setopenLogout(true)} >
                LOGOUT
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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

      <Dialog style={{maxWidth : '600'}} open={openCreateDialog} onClose={()=>{setOpenCreateDialog(false); setCode("")}} >
        <DialogTitle>CREATE CLASS</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Name of the Subject you want to create</DialogContentText>
          <TextField
             autoFocus
             margin="dense"
             id="code"
             label="Subject Code"
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
    </>
  )
}

export default Header