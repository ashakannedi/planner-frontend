import React, { useEffect, useState } from 'react';
import { IonPage, IonButton, IonHeader,IonToolbar,IonTitle, IonContent } from '@ionic/react';
import { useHistory,useParams } from 'react-router-dom';
import { fetchTasks, TaskData } from './../Service';

const Taskspage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use the service method with a callback
    fetchTasks((err, data) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks.');
      } else {
        setTasks(data || []);
      }
    });
  }, [id]);

  const handleClick = (taskId: string) => {
    history.push(`/details/${taskId}`);
  };
  return (
    <IonPage>
<<<<<<< HEAD
        <IonHeader>
          <IonToolbar>
            <IonTitle>Task Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <table style={{width: '100%',borderCollapse: 'collapse',marginTop: '16px',fontSize:22,fontFamily:'serif', borderBlock:'2px solid #80807c'}}>
              <thead style={{ padding: '12px', textAlign: 'left',fontWeight: 'bold', backgroundColor: '#c1f4f5',border:'2px solid #80807c'}}>
              <tr >
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Title</th>
                <th style={{ padding: '12px' }}>Description</th>
                <th style={{ padding: '12px' }}>Status</th>          
                <th style={{ padding: '12px' }}>Priority</th>
                <th style={{ padding: '12px' }}> deadLine</th>                 
=======

      <table style={{width: '100%',
  borderCollapse: 'collapse',
  marginTop: '16px'}}>

        <thead style={{ 
            padding: '12px', 
            textAlign: 'left',
            fontWeight: 'bold',}}>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th> Deadline</th>                 
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <tr key={task.id}>
                <td>
                  <IonButton onClick={() => handleClick(task.id)} fill="clear">
                    {task.id}
                  </IonButton>
                </td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.deadLine}</td>
>>>>>>> gandhi-edit
              </tr>
              </thead>
            <tbody>
              {tasks.length > 0 ? (
              tasks.map(task => (
              <tr key={task.id} style={{ cursor: 'pointer',transition: 'background-color 0.3s'}}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f3c9'} 
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                <td style={{ padding: '10px' }}><IonButton onClick={() => handleClick(task.id)} fill="clear">{task.id}</IonButton></td>
                <td style={{ padding: '10px' }}>{task.title}</td>
                <td style={{ padding: '10px' }}>{task.description}</td>
                <td style={{ padding: '10px' }}>{task.status}</td>
                <td style={{ padding: '10px' }}>{task.priority}</td>
                <td style={{ padding: '10px' }}>{task.deadLine}</td>
              </tr>
              ))
              ) : (
              <tr></tr>
              )}
            </tbody>
          </table>
        </IonContent>
    </IonPage>
  );
};

export default Taskspage;
