import React from 'react';
import { IonHeader, IonButton, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const history = useHistory();
  const { role, logout, Email } = useAuth(); // Access the auth context

  return (
    <IonHeader>
      <IonToolbar>
        {role === 'admin' && (
          <>
            {/* Admin-specific navigation buttons */}
            <IonButton onClick={() => history.push('/home')}>Home</IonButton>
            <IonButton onClick={() => history.push('/projects')}>Projects</IonButton>
            <IonButton onClick={() => history.push('/taskbyuserid')}>Tasks</IonButton>
            <IonButton onClick={() => history.push('/users')}>Users</IonButton>
            <IonButton onClick={() => history.push('/adduser')}>Add User</IonButton>
            <IonButton onClick={() => history.push('/project')}>Add Project</IonButton>
            <IonButton onClick={() => history.push('/task')}>Add Task</IonButton>
          </>
        )}
        {role === 'user' && (
          <>
            {/* User-specific navigation buttons */}
            <IonButton onClick={() => history.push('/projects')}>Projects</IonButton>
            <IonButton onClick={() => history.push('/taskbyuserid')}>Tasks</IonButton>
          </>
        )}
        {!Email ? (
          // Show login button if not logged in
          <IonButton onClick={() => history.push('/login')}>Login</IonButton>
        ) : (
          // Show logout button if logged in
          <IonButton onClick={logout}>Logout</IonButton>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default Navbar;
