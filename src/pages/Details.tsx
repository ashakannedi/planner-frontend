import { IonCard, IonCardContent, IonCardTitle, IonPage,IonLabel, IonItem,IonText, IonContent } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { fetchTaskById, TaskData } from '../Service';
import { useParams } from 'react-router';
const Details: React.FC = () => {
const {id} = useParams<{id:string}>();
const [task, setTask]= useState<TaskData | null>(null);

  useEffect(()=>{
    fetchTaskById(id, (err,data) =>{
      if(err){
        console.log('failed to fetch details')
      }else{
        setTask(data || null)
      }
    })
  }, [id]);

  return (
   
    
      <IonContent  style={{alignItems:'center'}}>
      <IonCard style={{
               maxWidth: '650px', 
               width: '100%',
               borderRadius: '12px',
               boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
               backgroundColor:'#a4ebd7',
               alignItems:'center'}}>
        <IonCardTitle style={{
               fontSize: '22px', 
               fontFamily:'serif',
               color: '#12120f',
               textAlign: 'center',
               }}> Task Details</IonCardTitle>
        <IonCardContent style={{backgroundColor:'#a4ebd7'}}> 
          {task ? (
            <div>
        <IonItem>
           <IonLabel>ID:</IonLabel>
           <IonText>{task.id}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Project Id:</IonLabel>
           <IonText>{task.id}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Title:</IonLabel>
           <IonText>{task.title}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Description:</IonLabel>
           <IonText>{task.description}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Start Date:</IonLabel>
           <IonText>{task.startDate}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>End Date:</IonLabel>
           <IonText>{task.endDate}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Status:</IonLabel>
           <IonText>{task.status}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Completed:</IonLabel>
           <IonText>{task.completed}%</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Priority:</IonLabel>
           <IonText>{task.priority}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Assigned Date:</IonLabel>
           <IonText>{task.assignDate}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Assigned Deadline:</IonLabel>
           <IonText>{task.deadLine}</IonText>
        </IonItem></div> ) : (
          <div> no details</div>
        )}
        </IonCardContent>
      </IonCard>
   </IonContent>
   
   )
};
export default Details;
