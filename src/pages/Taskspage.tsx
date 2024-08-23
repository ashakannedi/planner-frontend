import React, { useEffect, useState } from 'react';
import { IonPage, IonButton } from '@ionic/react';
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
                <td>{task.assignedDeadline}</td>
              </tr>
            ))
          ) : (
            <tr>
             
            </tr>
          )}
        </tbody>
      </table>
    </IonPage>
  );
};

export default Taskspage;
