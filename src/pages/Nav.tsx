import { IonContent, IonItem, IonLabel, IonPage, IonSelect ,IonSelectOption,IonPopover} from "@ionic/react";
import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import './Navbar.css'
const Navbar:React.FC = () =>{
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const history = useHistory();
  const handleCreateClick = (event: React.MouseEvent<HTMLIonLabelElement, MouseEvent>) => {
     // Show the dropdown
  };

  const handleOptionSelect = (e: CustomEvent) => {
    setSelectedOption(e.detail.value);

    if (e.detail.value === "adduser") {
      NavigateToAdduser(); 
    } else if (e.detail.value === "project"){
      NavigateToUserproject();
    }else if(e.detail.value === "task"){
      NavigateToUsertask();
    }
  };
  const NavigateToProject = () => {
    history.push('/project'); 
  };
  const NavigateToTask = () => {
    history.push('/task'); 
  };
  const NavigateToUser = () => {
    history.push('/user'); 
  };
  const NavigateToAdduser = () => {
    history.push('/adduser'); 
  };
  const NavigateToUserproject = () => {
    history.push('/userproject'); 
  };
  const NavigateToUsertask = () => {
    history.push('/usertask'); 
  };
  return (
    <IonPage>
      <IonContent>
    <div className="navbar">
        <IonItem>
            <IonLabel   onClick={() => history.push('/projects')}>Projects</IonLabel></IonItem>
            <IonItem>  <IonLabel onClick={()=> history.push('/taskbyuserid')}>Tasks</IonLabel></IonItem>
            <IonItem> <IonLabel onClick={NavigateToUser}>Users</IonLabel></IonItem>
            <IonItem> <IonLabel onClick={handleCreateClick} style={{ cursor: 'pointer' }}>Create</IonLabel>
          <IonSelect
            value={selectedOption}
            onIonChange={handleOptionSelect} interface="popover"
          >
            <IonSelectOption value="adduser"> User</IonSelectOption>
            <IonSelectOption value="project" >Project</IonSelectOption>
            <IonSelectOption value="task">Task</IonSelectOption>
          </IonSelect></IonItem>
          </div>
            </IonContent>
        </IonPage>
        )
}
export default Navbar;