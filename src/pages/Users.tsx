import React, { useState } from 'react';
import { IonIcon, IonModal, IonButton, IonInput, IonPage, IonContent } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import axios from 'axios';
import './Users.css';

// Define a type for User
interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  number: string;
  role: string;
  gender: string;
}

const Users:React.FC=()=> {
  const [userData, setUserData] = useState<User[]>([
    // Initial user data
  ]);
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleRegister = async () => {
    if (selectedUser) {
      try {
        // Make an API call to register the user
        const response = await axios.post('/userDetails/register', selectedUser);
        
        // Add the new user to the state
        setUserData((prevUsers) => [...prevUsers, response.data]);
        setIsModalOpen(false); // Close the modal
      } catch (error) {
        const err = error as any; // Handle error
        console.error("Error registering user:", err.response?.data || err.message);
      }
    }
  };

  const updateUser = (user: User) => {
    // Update user logic here
  };

  const deleteUser = (id: number) => {
    // Delete user logic here
  };

  return (
    <IonPage>
      <IonContent>
    <div className="users-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Number</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.number}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td className="action-icons">
                <IonIcon
                  icon={pencilOutline}
                  className="icon update-icon"
                  onClick={() => updateUser(user)}
                />
                <IonIcon
                  icon={trashOutline}
                  className="icon delete-icon"
                  onClick={() => deleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <div className="modal-content">
          <h2>Register User</h2>
          {selectedUser && (
            <>
              <IonInput
                value={selectedUser.fullName}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.detail.value! })}
                placeholder="Full Name"
              />
              <IonInput
                value={selectedUser.email}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, email: e.detail.value! })}
                placeholder="Email"
              />
              <IonInput
                value={selectedUser.password}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, password: e.detail.value! })}
                placeholder="Password"
                type="password"
              />
              <IonInput
                value={selectedUser.number}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, number: e.detail.value! })}
                placeholder="Number"
              />
              <IonInput
                value={selectedUser.role}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, role: e.detail.value! })}
                placeholder="Role"
              />
              <IonInput
                value={selectedUser.gender}
                onIonChange={(e) => setSelectedUser({ ...selectedUser, gender: e.detail.value! })}
                placeholder="Gender"
              />
            </>
          )}
          <IonButton onClick={handleRegister}>Register</IonButton>
          <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </div>
      </IonModal>
    </div></IonContent></IonPage>
  );
}

export default Users;
