
import React from 'react';
import home from "../../images/home.svg";
import { makeStyles } from '@material-ui/core/styles';
import Common from './Common';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../images/logo.png'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Home = (props) => {
    const classes = useStyles();
    return (
        <>
            <AppBar color="white" style={{borderBlockColor : 'white' , borderColor : 'white'}} position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="white"
                        aria-label="menu"
                        className={classes.menuButton}
                    >
                    <img style={{maxWidth : '3rem' , width : '100%' , textAlign : 'right'}} src={Logo} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        SkillKits
                    </Typography>
                    <Button onClick={()=> props.history.push('/signup')} color="inherit">
                        Signup
                    </Button>
                    <Button onClick={()=> props.history.push('/login')} color="inherit">
                        Login
                    </Button>
                </Toolbar>
                {/* <ModalDialog open={open} handleClose={handleClose} /> */}
            </AppBar>
            <Common
                name='Grow your Skills with'
                imgsrc={home}
                isCompName={true}
                compName="Skill Kits"
                visit='/login'
                btnname="Get Started"
            />
        </>
    )
}

export default Home;