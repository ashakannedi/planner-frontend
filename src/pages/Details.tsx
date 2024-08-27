import { 
  IonCard, IonCardContent, IonCardTitle, IonPage, IonLabel, IonItem, IonText, 
  IonHeader, IonToolbar, IonTitle, IonInput, IonDatetime, IonButton, IonIcon, 
  IonModal, IonContent
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { fetchTaskById, updateTask, TaskData } from '../Service';
import { useParams } from 'react-router';
import { calendarOutline } from 'ionicons/icons';
import './Details.css';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<TaskData | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    fetchTaskById(id, (err, data) => {
      if (err) {
        console.log('Failed to fetch details');
      } else {
        setTask(data || null);
        setUpdatedTask(data || null);
      }
    });
  },
   [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updatedTask) {
      setUpdatedTask({
        ...updatedTask,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateChange = (e: CustomEvent) => {
    if (updatedTask) {
      const name = e.detail.name;
      const value = e.detail.value;
      setUpdatedTask({
        ...updatedTask,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    if (updatedTask) {
      updateTask(updatedTask, (err) => {
        if (err) {
          console.log('Failed to update task');
        } else {
          setTask(updatedTask);
          setIsEditing(false);
        }
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask(task);
  };

  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: '#f0ebce' }}>
        <IonToolbar className='backkk'>
          <IonTitle>Task Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="scroll-content"> {/* Make the content scrollable */}
        <IonCard className="formdata">
          <IonCardContent className="details">
            {task ? (
              <>
                <IonItem className="form-group">
                  <IonLabel>ID:</IonLabel>
                  <IonText>{task.id}</IonText>
                </IonItem>
                <IonItem className="form-group">
                  <IonLabel>Project Id:</IonLabel>
                  <IonText>{task.id}</IonText>
                </IonItem>
                <IonItem className="form-group">
                  <IonLabel>Title:</IonLabel>
                  <IonText>{task.title}</IonText>
                </IonItem>
                <IonItem className="form-group">
                  <IonLabel>Description:</IonLabel>
                  <IonText>{task.description}</IonText>
                </IonItem>

                <IonItem className="form-group">
               <IonLabel>Start Date:</IonLabel>
               <IonText>{task.startDate}</IonText>
               {isEditing && (
                 <>
                   <IonButton onClick={() => setShowStartDatePicker(true)}>
                     <IonIcon icon={calendarOutline} />
                   </IonButton>
                   <IonModal isOpen={showStartDatePicker}>
                     <IonDatetime
                       name="startDate"
                       value={updatedTask?.startDate}
                       onIonChange={handleDateChange}
                     />
                     <IonButton onClick={() => setShowStartDatePicker(false)}>
                       Done
                     </IonButton>
                   </IonModal>
                 </>
               )}
             </IonItem>
             
             <IonItem className="form-group">
               <IonLabel>End Date:</IonLabel>
               <IonText>{task.endDate}</IonText>
               {isEditing && (
                 <>
                   <IonButton onClick={() => setShowEndDatePicker(true)}>
                     <IonIcon icon={calendarOutline} />
                   </IonButton>
                   <IonModal isOpen={showEndDatePicker}>
                     <IonDatetime
                       name="endDate"
                       value={updatedTask?.endDate}
                       onIonChange={handleDateChange}
                     />
                     <IonButton onClick={() => setShowEndDatePicker(false)}>
                       Done
                     </IonButton>
                   </IonModal>
                 </>
               )}
             </IonItem>

             <IonItem className="form-group">
               <IonLabel>Status:</IonLabel>
               <IonText>{task.status}</IonText>
             </IonItem>
             
              <IonItem className="form-group">
                <IonLabel>Percentage:</IonLabel>
                <div className="percentage-input-container">
                  {isEditing ? (
                    <IonInput
                      name="percentage"
                      type="text" // Change to number to ensure proper numeric input
                      value={updatedTask?.completed || ''} // Ensure value is not undefined
                      onIonChange={(e: CustomEvent) => handleInputChange(e as any)}
                      className="percentage-input"
                    />
                  ) : (
                    <IonText className="percentage-input">{task.completed}%</IonText>
                  )}
                </div>
              </IonItem>
             <IonItem className="form-group">
               <IonLabel>Priority:</IonLabel>
               <IonText>{task.priority}</IonText>
             </IonItem>
             <IonItem className="form-group">
               <IonLabel>Assigned Date:</IonLabel>
               <IonText>{task.assignDate}</IonText>
             </IonItem>
             <IonItem className="form-group">
               <IonLabel>Assigned Deadline:</IonLabel>
               <IonText>{task.deadLine}</IonText>
             </IonItem>           
                {isEditing ? (
                  <>
                    <IonButton onClick={handleSave}>Save</IonButton>
                    <IonButton onClick={handleCancel}>Cancel</IonButton>
                  </>
                ) : (
                  <IonButton onClick={() => setIsEditing(true)}>Edit</IonButton>
                )}
              </>
            ) : (
              <div className="no-details">No details available</div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Details;
