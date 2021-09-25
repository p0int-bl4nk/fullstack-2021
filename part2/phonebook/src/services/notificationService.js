const handleNotification = (notification, setNotification) => {
  setNotification(notification);
  setTimeout(
    () => setNotification({message: '', type: ''}),
    5000
  );
}

const notificationService = {handleNotification};
export default notificationService;