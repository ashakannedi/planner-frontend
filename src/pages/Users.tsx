import React, { useState, useEffect } from 'react';
import { IonIcon, IonModal, IonButton, IonInput } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import axios from 'axios';
import './Users.css';

// Define a type for User
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: string;
  gender: string;
}

function Users() {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/userDetails');
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user registration or update
  const handleSave = async () => {
    if (selectedUser) {
      try {
        if (selectedUser.id === 0) {
          // Register new user
          const response = await axios.post('http://localhost:8080/userDetails/register', selectedUser);
          setUserData((prevUsers) => [...prevUsers, response.data]);
        } else {
          // Update existing user
          const response = await axios.put(`http://localhost:8080/userDetails/user/${selectedUser.id}`, selectedUser);
          setUserData((prevUsers) =>
            prevUsers.map((user) => (user.id === selectedUser.id ? response.data : user))
          );
        }
        setIsModalOpen(false); // Close the modal
        setSelectedUser(null); // Clear the selected user
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  // Function to handle user deletion
  const deleteUser = async (id: number) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.delete(`http://localhost:8080/userDetails/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200 || response.status === 204) {
        setUserData((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  
  

  // Function to handle user update
  const updateUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.mobile}</td>
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
          <h2>{selectedUser?.id === 0 ? 'Register User' : 'Update User'}</h2>
          <IonInput
            value={selectedUser?.name || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, name: e.detail.value! }))}
            placeholder="Full Name"
          />
          <IonInput
            value={selectedUser?.email || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, email: e.detail.value! }))}
            placeholder="Email"
          />
          <IonInput
            value={selectedUser?.password || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, password: e.detail.value! }))}
            placeholder="Password"
            type="password"
          />
          <IonInput
            value={selectedUser?.mobile || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, mobile: e.detail.value! }))}
            placeholder="Number"
          />
          <IonInput
            value={selectedUser?.role || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, role: e.detail.value! }))}
            placeholder="Role"
          />
          <IonInput
            value={selectedUser?.gender || ''}
            onIonChange={(e) => setSelectedUser((prev) => ({ ...prev!, gender: e.detail.value! }))}
            placeholder="Gender"
          />
          <IonButton onClick={handleSave}>{selectedUser?.id === 0 ? 'Register' : 'Update'}</IonButton>
          <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </div>
      </IonModal>
    </div>
  );
}

export default Users;