import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>({
    root: {
        
        borderRadius: '10px',
        margin: '15px',
        "&:hover": {
            boxShadow: "1px 1px 10px gray",
        }
    },
    media: {
        height: 50,
    },
    header: {
        backgroundImage: "url('https://gstatic.com/classroom/themes/Physics.jpg')",
        backgroundSize: 'contain',
        color: "white",
        height: 100
    },
    avatar: {
        marginTop: -35,
        marginLeft: "auto",
        marginRight: 10,
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    actionArea:{
        minWidth: 300,
        minHeight: 75,
        height : 120
    },
    action: {
        borderTop: '1px solid lightgray',
    }
}));

export default function CardClass({code, data}) {
    const classes = useStyles();
    const user = 'somya'
    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader
                action={
                    <IconButton aria-label="settings" >
                        <MoreVertIcon style={{'color':"white"}}/>
                    </IconButton>
                }
                title={
                    <Link to={`/subject/${data._id}`} style={{color:'white', textDecoration:'none'}} >{data.name}<p style={{fontSize:13}}>{data.classCode}</p></Link>
                }
                subheader={!user.isAdmin && data.facultyNames && data.facultyNames.length > 0  ? data.facultyNames.join(' ') : ""}
                className={classes.header}
                subheaderTypographyProps={{color: 'white'}}
                
            />
            <Avatar className={classes.avatar} src={data.teacherPhotoURL}/>
            
            <CardContent className={classes.actionArea}>

            </CardContent>
        </Card>
    );
}