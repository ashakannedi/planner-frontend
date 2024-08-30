import { 
  IonCard, IonCardContent, IonCardTitle, IonPage, IonLabel, IonItem, IonText, 
  IonHeader, IonToolbar, IonTitle, IonInput, IonDatetime, IonButton, IonIcon, 
  IonModal, IonContent
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { fetchTaskById, updateTask, TaskData } from '../Service';
import { useParams } from 'react-router';
import { calendarOutline } from 'ionicons/icons';
import './DetailsByTaskId.css';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<TaskData | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedTask, setUpdatedTask] = useState<TaskData | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState<string | null>(null);


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
    if (updatedTask && activeDateField) {
      const value = e.detail.value;
      setUpdatedTask({
        ...updatedTask,
        [activeDateField]: value,
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
    <>
      <IonHeader className='head'>
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
                  {isEditing ? (
                    <>
                      <IonText>{updatedTask?.startDate || 'No date selected'}</IonText>
                      <IonButton onClick={() => {
                        setActiveDateField('startDate');
                        setShowStartDatePicker(true);
                      }}>
                        <IonIcon icon={calendarOutline} />
                      </IonButton>
                      <IonModal isOpen={showStartDatePicker} onDidDismiss={() => setShowStartDatePicker(false)}>
                        <IonDatetime
                          value={updatedTask?.startDate || ''}
                          onIonChange={handleDateChange}
                        />
                        <IonButton onClick={() => setShowStartDatePicker(false)}>
                          Done
                        </IonButton>
                      </IonModal>
                    </>
                  ) : (
                    <IonText>{task.startDate || 'No date selected'}</IonText>
                  )}
                </IonItem>
             
              <IonItem className="form-group">
                <IonLabel>End Date:</IonLabel>
                {isEditing ? (
                  <>
                    <IonText>{updatedTask?.endDate || 'No date selected'}</IonText>
                    <IonButton onClick={() => {
                      setActiveDateField('endDate');
                      setShowEndDatePicker(true);
                    }}>
                      <IonIcon icon={calendarOutline} />
                    </IonButton>
                    <IonModal isOpen={showEndDatePicker} onDidDismiss={() => setShowEndDatePicker(false)}>
                      <IonDatetime
                        value={updatedTask?.endDate || ''}
                        onIonChange={handleDateChange}
                      />
                      <IonButton onClick={() => setShowEndDatePicker(false)}>
                        Done
                      </IonButton>
                    </IonModal>
                  </>
                ) : (
                  <IonText>{task.endDate || 'No date selected'}</IonText>
                )}
              </IonItem>

             <IonItem className="form-group">
                <IonLabel>Status:</IonLabel>
                {isEditing ? (
                  <IonInput className="status-edit"
                    name="status"
                    value={updatedTask?.status || ''}
                    onIonChange={(e: CustomEvent) => handleInputChange(e as any)}
                    placeholder="Enter status"
                  />
                ) : (
                  <IonText className="status-save">{task.status}</IonText> // The status will be displayed on the right after saving
                )}
              </IonItem>
             
              <IonItem className="form-group">
                <IonLabel>Percentage:</IonLabel>
                <div className="percentage-input-container">
                  {isEditing ? (
                    <IonInput className="status-edit"
                    name="completed" // Ensure this matches the key used in your TaskData model
                    type="number"
                    min="0"
                    max="100"
                    
                    value={updatedTask?.completed || ''} 
                    onIonChange={(e: CustomEvent) => handleInputChange(e as any)}
                    // className="percentage-input"
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
    </>
  );
};

export default Details;
