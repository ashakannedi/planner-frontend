import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonItem, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import './Profile.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader  className="custom-header">
        <IonToolbar  >
          <IonTitle className="custom-header-title">User Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-container">
          
          <img src="../assets/icon/hedgehog.jpg" alt="hedgehog" />
        </div>
        
        <div className="details">
          <h2>Personal Information</h2>
        </div>
        
        <div className="formdata">
          <form action="">
            <IonItem>
              <IonLabel position="floating">Full Name:</IonLabel>
              <IonInput type="text" id="fullname" name="fullname"></IonInput>
            </IonItem>
            
            <hr />
            
            <IonItem>
              <IonLabel position="floating">Professional Role:</IonLabel>
              <IonSelect id="role" name="role">
                
                <IonSelectOption value="full stack developer">Full Stack Developer</IonSelectOption>
                <IonSelectOption value="tester">Tester</IonSelectOption>
                <IonSelectOption value="frontend">Frontend</IonSelectOption>
                <IonSelectOption value="java developer">Java Developer</IonSelectOption>
                <IonSelectOption value="python developer">Python Developer</IonSelectOption>
                <IonSelectOption value="devops">DevOps</IonSelectOption>
              </IonSelect>
            </IonItem>
            
            <hr />
            
            <IonItem>
              <IonLabel position="floating">Email:</IonLabel>
              <IonInput type="email" id="mail" name="mail"></IonInput>
            </IonItem>
            
            <hr />
            
            <IonItem>
              <IonLabel position="floating">Password:</IonLabel>
              <IonInput type="password" id="pass" name="pass"></IonInput>
            
              <IonButton fill="clear" routerLink="/Change">Change</IonButton>
            </IonItem>
            
            <hr />
            
            <IonItem>
              <IonLabel position="floating">Phone Number:</IonLabel>
              <IonInput type="text" id="phone" name="phone" pattern="\d{10}" title="Please enter exactly 10 digits" required></IonInput>
            </IonItem>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
