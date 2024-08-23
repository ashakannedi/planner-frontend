import { IonCard, IonCardContent, IonCardTitle, IonPage,IonLabel, IonItem,IonText } from '@ionic/react';
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
   
    <IonPage>
      <IonCard>
        <IonCardTitle style={{
          borderRadius:8,
         fontSize:25,
         color:'#0f1014'
        }}> Project Details</IonCardTitle>
        <IonCardContent> 
          {task ? (
            <>
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
           <IonLabel>Percentage:</IonLabel>
           <IonText>{task.percentage}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Priority:</IonLabel>
           <IonText>{task.priority}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Assigned Date:</IonLabel>
           <IonText>{task.assignedDate}</IonText>
        </IonItem>
        <IonItem>
           <IonLabel>Assigned Deadline:</IonLabel>
           <IonText>{task.assignedDeadline}</IonText>
        </IonItem></> ) : (
          <div> no details</div>
        )}
        </IonCardContent>
      </IonCard>
    </IonPage>
    
   )

};

export default Details;
