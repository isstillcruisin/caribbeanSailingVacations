import React from "react";

function Alert(props) {
  if (props.location && props.location.state && props.location.state.alert) {
    return (<div className='alert'>{props.location ? props.location.state.alert : ''}</div>);
  } else {
    return "";
  }
}

export default Alert;