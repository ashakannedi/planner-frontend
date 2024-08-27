import React,{useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
interface Projects{
    id:string;
    name:string;
    
}
const Projects:React.FC = () =>{
    const history = useHistory();
    const [projects, setProjects] = useState<Projects[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('http://192.168.1.209:8080/projects')
        .then(response => {
            setProjects(response.data)
        })
        .catch(err =>{
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects.');
        })
    } ,[])
    const handleProjectClick = (id: string) => {
        history.push(`/taskspage/${id}`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Project Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <table style={{
                   width: 100,
                   borderCollapse: 'collapse',
                   margin: 16 ,
                   backgroundColor: '#fff',
                   boxShadow: '0 2 4 rgba(0, 0, 0, 0.1)'
              }}>
                    <tr  >
                        <th>ProjectId</th>
                        <th>Project Name</th>
                        <th>Users</th>
                    </tr>
                    <tbody>
                    {projects.map(Projects => (
                    <tr key={Projects.id}>
                      
                        <td><IonButton onClick={() => handleProjectClick(Projects.id)} fill="clear">
                                        {Projects.id}
                                    </IonButton></td>
                        <td>{Projects.name}</td>
                        <td>Users1</td>
                    </tr>  ))}
                    <tr>
                       
                    </tr></tbody>
                </table>
            </IonContent>
        </IonPage>
    );
};

export default Projects;
