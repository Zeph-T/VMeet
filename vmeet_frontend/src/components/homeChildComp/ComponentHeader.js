import React from 'react'
import {  Button } from '@material-ui/core'
import { ListAlt, CalendarToday } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      textTransform: 'none'
    },
  }));
  

function MainCompHeader(props) {
    const classes = useStyles();

  return (
    <div>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<ListAlt />}
      >
        To-do
      </Button>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<CalendarToday />}
        onClick={props.handleDrawerOpen}
      >
        Calendar
      </Button>
    </div>
  );
}

export default MainCompHeader