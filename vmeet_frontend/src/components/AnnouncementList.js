import React,{useState,useContext} from 'react'
import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import moment from 'moment-timezone';
import WrappedButton from './common/WrappedButton';
import { UserContext } from '../App';
import noAnnouncementLogo from '../images/noAnnounements.svg'
import axios from 'axios';
import { api } from '../utilities';
const useStyles = makeStyles((theme) => ({
  item: {
    border: '1px solid lightgray',
    borderRadius: '.5rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
    marginTop: '1rem',
    marginBottom : '1rem'
  },
  itemtop: {
    border: '1px solid lightgray',
    borderRadius: '.5rem .5rem 0rem 0rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
    top: '10',
    marginTop : '1.5rem'
  },
  itembot: {
    border: '1px solid lightgray',
    borderRadius: '0rem 0rem .5rem .5rem',
    padding: '1rem',
    boxShadow: '1px 1px 3px gray',
  },
  list: {
    paddingTop: 0,
  },
}))
const options = {
  headers : {
      "Content-Type" : "application/json",
      "AccessToken" : localStorage.getItem("AccessToken")
  }
}

// const announcements = [
//   {
//     _id: '612bf161a4e5ee395d99b914',
//     postedOn: '2021-08-29T20:43:13.198Z',
//     content: 'This is a third testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
//     content: 'This is a second testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
//   {
//     _id: '612bf151a4e5ee395d99b90e',
//     postedOn: '2021-08-29T20:42:57.917Z',
//     content: 'This is a testing anouncnement for IOT1 class Subject',
//     subjectId: '612bee7bb9662deba915a4b9',
//     __v: 0,
//   },
// ]

const AnnouncementList = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const user = state;
  const [postInProgress , setPostInProgress ] = useState(false);
  const [newAnnouncement , setNewAnnouncement] = useState('');
  const classes = useStyles();
  const [announcements,setAnnouncements] = useState(props.announcements);

  let postNewAnouncement = () => {
    let data = {
      subjectId : props.subjectId,
      content : newAnnouncement
    };
    if(newAnnouncement.length > 0){
      setPostInProgress(true);
      axios.post(api.BASE_URL  + api.POST_ANNOUNCEMENT_URL , data,options).then(result=>{
        result = result.data;
        let tempAnnouncements = JSON.parse(JSON.stringify(announcements));
        tempAnnouncements.unshift(result);
        setAnnouncements(tempAnnouncements);
        setPostInProgress(false);
        props.openSnackBar('Posted Announcement Succesfully!');
        setNewAnnouncement("");
      }).catch(err=>{
        setPostInProgress(false);
        props.openSnackBar(err.stack);
      })
    }else{
      setPostInProgress(false);
      props.openSnackBar('Cannot post an Empty String');
    }
  }



  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Announcements</h2>
       <List className={classes.list}>
        {
         user && user.isAdmin === true ? 
            <TextField 
              value={newAnnouncement}
              fullWidth
              onChange={event=>setNewAnnouncement(event.target.value)}
              multiline
              placeholder="Post an Announcement"
              minRows={2}
              variant="outlined"
              InputProps = {{
                endAdornment : (
                  <WrappedButton  color="primary" disabled={postInProgress} name="Post" onClick={postNewAnouncement}  />
                )
              }}
            /> : null
        }
        {/* </ListItem> */}
        {
          announcements === undefined || announcements && announcements.length == 0 ? 
          <div>
            <img style={{maxWidth : '35rem',maxHeight : '40rem'}} src={noAnnouncementLogo} alt="logo" />
          </div> :
          announcements.map((ann) => {
          return (
            <>
              <ListItem className={classes.itemtop}>
                <ListItemAvatar>
                  <Avatar alt='None' src='#' />
                </ListItemAvatar>
                <ListItemText primary={ann.postedBy} secondary={ann.postedOn ? moment(new Date(ann.postedOn)).format('LLL') : ""} />
              </ListItem>
              <ListItem className={classes.itembot}>
                <ListItemText primary={ann.content} />
              </ListItem>
            </>
          )
        })}
      </List>
    </>
  )
}

export default AnnouncementList
