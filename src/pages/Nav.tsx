import {IonContent, IonHeader, IonSelect, IonSelectOption, IonPage, IonButton} from "@ionic/react";
import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import './Navbar.css';
const Navbar:React.FC = () =>{
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const history = useHistory();
  const handleOptionSelect = (e: CustomEvent) => {
    setSelectedOption(e.detail.value); 
    if (e.detail.value === "adduser") {
      NavigateToAdduser(); 
    } else if (e.detail.value === "project"){
      NavigateToUserproject();
    }else if(e.detail.value === "task"){
      NavigateToUsertask();
    }  };
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
          <IonHeader className="navbar">
                <IonButton  onClick={() => history.push('/projects')}>Projects</IonButton>
                <IonButton  onClick={()=> history.push('/taskbyuserid')}>Tasks</IonButton>
                <IonButton onClick={NavigateToUser}>Users</IonButton>
                <IonButton 
                      onMouseEnter={() => setShowSelect(true)}
                      onMouseLeave={() => setShowSelect(false)}
                      style={{ position: 'relative', cursor: 'pointer'}}>
                      Create
                    {showSelect && (
                  <IonSelect className="select-container"
                  value={selectedOption}
                  onIonChange={handleOptionSelect}
                  interface="popover">
                  <IonSelectOption value="adduser">User</IonSelectOption>
                  <IonSelectOption value="project">Project</IonSelectOption>
                  <IonSelectOption value="task">Task</IonSelectOption>
                  </IonSelect>)}
                </IonButton>
          </IonHeader>
          <IonContent>
            <img src="../assets/icon/laptop.png" style={{width:1900,height:893,borderRadius:20}} />
          </IonContent>
    </IonPage> 
  )
}
export default Navbar;