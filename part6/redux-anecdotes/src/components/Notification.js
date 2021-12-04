
import React from 'react'
import {connect} from "react-redux";
import {actionHideNotification} from "../reducers/notificationReducer";

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!props.notification)
    return null;
  else
    setTimeout(() => props.actionHideNotification(), 3000);

  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = ({ notification }) => ({ notification });

const mapDispatchToProps = { actionHideNotification }

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default ConnectedNotification