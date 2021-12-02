
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {actionHideNotification} from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification)
    return null;
  else
    setTimeout(() => dispatch(actionHideNotification()), 3000);

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification