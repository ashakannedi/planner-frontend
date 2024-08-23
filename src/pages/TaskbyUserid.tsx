import React ,{useState,useEffect}from "react";
import { IonPage ,IonButton} from "@ionic/react";
import axios from "axios";

interface Taskbyuid {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    deadLine: string;
    userId: string;
  }
const TaskbyUserid:React.FC=()=>{
    const [tasks, setTasks] = useState<Taskbyuid[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Fetch data from the API
      axios.get('http://192.168.1.209:8080/tasks')
        .then(response => {
          setTasks(response.data); // Assuming the data is an array of tasks
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching tasks:', err);
          setError('Failed to fetch tasks.');
          setLoading(false);
        });
    }, []);
return(
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
                        <th> DeadLine</th>
                        <th> UserId</th>             
                    </tr>
                </thead>
                <tbody>
                {tasks.length > 0 ? (
                     tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{task.priority}</td>
                            <td>{task.deadLine}</td>
                            <td>{task.userId}</td>
                        </tr>
                     ))
                    ):(<tr></tr>)}
                    
                </tbody>
        </table>
    </IonPage>    
)
}
export default TaskbyUserid;