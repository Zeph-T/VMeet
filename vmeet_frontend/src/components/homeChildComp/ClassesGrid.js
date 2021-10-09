import React from 'react'
import CardClass from './SubjectCard.js'
import { makeStyles } from '@material-ui/core/styles';


const Styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    responsive: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}));


const ClassesGrid = ({subjects}) => {
    const classes = Styles();

    return (
        <div className={classes.root}>
    <div className={classes.responsive}>
        {
            subjects.map((sub) => <><CardClass code={sub.classCode} data={sub}/></>)
        }
    </div>

</div>
    )
}

export default ClassesGrid