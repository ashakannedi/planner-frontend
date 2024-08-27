import React, { useState, useEffect } from "react";
import { IonPage, IonButton } from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router";
import './TaskbyUserid.css'; // Import the CSS file

interface Taskbyuid {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    deadLine: string;
    userId: string;
}

const TaskbyUserid: React.FC = () => {
    const history = useHistory();
    const [tasks, setTasks] = useState<Taskbyuid[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
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

    const handleProjectClick = (id: string) => {
        history.push(`/detailsbasedontaskid/${id}`);
    };

    return (
        <IonPage>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>DeadLine</th>
                            <th>UserId</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>
                                        <IonButton onClick={() => handleProjectClick(task.id)} fill="clear">
                                            {task.id}
                                        </IonButton>
                                    </td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.deadLine}</td>
                                    <td>
                                        <IonButton onClick={() => handleProjectClick(task.id)} fill="clear">
                                            {task.userId}
                                        </IonButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>No tasks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </IonPage>
    );
}

export default TaskbyUserid;
