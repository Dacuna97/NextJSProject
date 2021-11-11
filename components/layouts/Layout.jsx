import React, { Fragment, useContext } from 'react';
import MainHeader from './MainHeader';
import Notification from '../ui/Notification';
import NotificationContext from '../../store/notification-context';

function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
