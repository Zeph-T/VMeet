import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles} from '@material-ui/styles';


const WrappedButton = ({buttonKey,disabled,variant,color,onClick,classes,name,icon,style,size}) => {
    return (
      <Button size={size?size:'medium'}  key={buttonKey} disabled={disabled} variant={variant} color={color} onClick={onClick} className={classes.button} style={style}>
        {icon &&
        <span style={{marginRight:"0.5rem"}}>
        {icon}
        </span>
        }
       {name}
       {disabled && <CircularProgress size={24} className={classes.buttonProgress} style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         marginTop: -12,
         marginLeft: -12
       }}/>}
      </Button>
    );
}

WrappedButton.propTypes = {
    buttonKey: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    style: PropTypes.object
  };
  export default withStyles({})(WrappedButton);