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
            <table style={{ width: 100,borderCollapse: 'collapse', margin: 16,backgroundColor: '#fff',fontSize: 22,fontFamily:'serif',borderBlock:'2px solid #80807c'}}>
                <thead style={{backgroundColor: '#b4cad6',padding: 40,}}>
                    <th  style={{ padding: 30,paddingLeft:100,textAlign: 'left', width: 33}}>ProjectId</th>
                    <th  style={{padding: 30,paddingLeft:100,textAlign: 'left',width: 33}}>ProjectName</th>
                    <th  style={{padding: 30,paddingLeft:100,textAlign: 'left',width: 34}}>Users</th>
                </thead>
                <tbody style={{padding: '12px',}}>{projects.map(Projects => (
                    <tr key={Projects.id} style={{
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s',
                        padding: '12px',
                        backgroundColor: '#d5d6e3'
                      }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3d1e3'} 
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'} 
                    >
                        <td><IonButton style={{ padding: 20 ,paddingLeft:100}} onClick={() => handleProjectClick(Projects.id)} fill="clear">{Projects.id}</IonButton></td>
                        <td  style={{ padding: 20,paddingLeft:100 }}>{Projects.name}</td>
                        <td style={{ padding: 20,paddingLeft:100, }}>Users1</td>
                    </tr>  ))}
                    <tr>
                       
                    </tr>
                </tbody>
                </table>
            </IonContent>
        </IonPage>
    );
};

export default Projects;
