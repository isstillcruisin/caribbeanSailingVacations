import React from 'react'

function Alert(props) {
  if (props.alert) {
    return (<div className='alert'>{props.alert}</div>)
  } else {
    return ''
  }
}

export default Alert