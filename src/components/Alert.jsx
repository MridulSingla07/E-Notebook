import React from 'react'

export default function Alert(props) {
  return (
    <div >
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible`} role="alert">
            <strong>{props.alert.msg}</strong>
        </div>}
    </div>
  )
}
