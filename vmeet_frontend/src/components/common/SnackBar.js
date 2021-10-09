import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class CustomSnackBar extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            showSnackBar:false,
            snackBarMessage:""
        };
        this.openSnackBar = this.openSnackBar.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }
    openSnackBar(message){
        if(typeof message !== "string"){
          message = "Something went Wrong!Try Again Later";
        }
        this.setState({snackBarMessage:message,showSnackBar:true});
    }


    closeSnackBar(){
        this.setState({snackBarMessage:'',showSnackBar:false});
    }

    render() {
        const { classes, theme } = this.props;
        return (<Snackbar
        open={this.state.showSnackBar}
        message={this.state.snackBarMessage}
        autoHideDuration={4000}
        onClose={this.closeSnackBar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.closeSnackBar}
        >
          <CloseIcon />
        </IconButton>
      ]}
      />);
    }   
}

export default withStyles({}, { withTheme: true })(CustomSnackBar);