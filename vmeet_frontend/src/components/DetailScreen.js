import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import AnnouncementList from "./AnnouncementList";
import { LinearProgress } from "@material-ui/core";
import {UserContext} from '../App';
// import "../App/App.css";
import axios from "axios";
import { api } from "../utilities";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5rem",
  },
  banner: {
    height: 225,
    backgroundImage:
      "url('https://gstatic.com/classroom/themes/img_bookclub.jpg')",
    borderRadius: ".5rem",
    backgroundSize: "cover",
    backgroundRepeat: "none",
  },
  classname: {
    fontSize: "30px",
    color: "white",
  },
  border: {
    border: "1px solid",
  },
  leftmenu: {
    flex: "1",
  },
  rightmenu: {
    flex: "1",
  },
}));
const options = {
    headers : {
        "Content-Type" : "application/json",
        "AccessToken" : localStorage.getItem("AccessToken")
    }
  }
  
const DetailScreen = (props) => {
  const { state, dispatch } = useContext(UserContext);
  const user = state;
  const [loadingScreen, setLoadingScreen] = useState(true);
  const { subjectId } = useParams();
  const classes = useStyles();
  const [announcements, setAnnouncements] = useState([]);
  const [name, setName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [faculty, setFaculty] = useState([]);

  let joinClass = () => {
      window.location = `/meet/${subjectId}/`
  }


  useEffect(() => {
    axios
      .get(api.BASE_URL + api.GET_SUBJECT_DATA_URL + subjectId, options)
      .then((data) => {
        data = data.data;
        setAnnouncements(data.announcements);
        setClassCode(data.classCode);
        setFaculty(data.faculty);
        setName(data.name);
        setLoadingScreen(false);
      })
      .catch((err) => {
        setLoadingScreen(false);
        props.openSnackBar(err.stack);
      });
  }, []);
  if (loadingScreen === true) {
    return (
      <div className="verticalCenterAligned">
        <h2>LOADING YOUR DATA</h2>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Container className={classes.banner}>
        <List>
          <ListItem>
            <ListItemText
              primary={<h1 style={{ color: "white" }}>{name}</h1>}
              secondary={<h2 style={{ color: "white" }}>{classCode}</h2>}
              className={classes.classname}
            />
            
          </ListItem>
        </List>
      </Container>
      <Button onClick={joinClass} style={{backgroundColor: '#091353',margin:'1rem',padding:'1rem'}}><div style={{color:'white'}}><b>Join Classroom Meet</b></div></Button>
      <Container style={{ display: "flex", padding: "0", marginTop: "1.5rem" }}>
        <div className={classes.rightmenu}>
          <Container>
            <AnnouncementList
              {...props}
              subjectId={subjectId}
              announcements={announcements}
            />
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default DetailScreen;
