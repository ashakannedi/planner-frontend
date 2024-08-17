import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel } from '@ionic/react';

type DetailData = {
  name: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  percentage: string;
  priority: string;
  assignedDate: string;
  assignedDeadline: string;
};

type Details = {
  [key: string]: DetailData;
};


const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const details: Details = {
    '01': { name: 'Dev', title: 'Frontend', description: 'Development of visual elements...', startDate: '21-08-2024', endDate: '23-09-2024', status: 'Started', percentage: '10%', priority: 'High', assignedDate: '21-08-2024', assignedDeadline: '15-09-2024' },
    '02': { name: 'Devi', title: 'Frontend Engineer', description: 'Development of visual elements...', startDate: '20-08-2024', endDate: '20-09-2024', status: 'Started', percentage: '20%', priority: 'High', assignedDate: '19-08-2024', assignedDeadline: '23-09-2024' }
  };

  useEffect(() => {
    setData(details[id]);
  }, [id]);
  

//   const data = details[id];

  if (!data) {
    return <div>No data found for ID: {id}</div>;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Details for ID: {id}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Name:</strong> {data.name}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Title:</strong> {data.title}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Description:</strong> {data.description}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Start Date:</strong> {data.startDate}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>End Date:</strong> {data.endDate}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Status:</strong> {data.status}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Percentage:</strong> {data.percentage}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Priority:</strong> {data.priority}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Assigned Date:</strong> {data.assignedDate}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Assigned Deadline:</strong> {data.assignedDeadline}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default Details;
