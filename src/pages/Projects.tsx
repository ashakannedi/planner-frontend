import React,{useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton,IonCard ,IonCardTitle,IonCardHeader,IonCardContent} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from 'inspector';
interface Projects{
    id:string;
    name:string;
    users:string;
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
            <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Project Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{backgroundImage:'url(public/assets/icon/img.png)'}}> 
            <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'center',
                padding: '16px',
                backgroundColor:""
             }}>
            {projects.map((project) => (
            <IonCard
            key={project.id}
            style={{
              width: '350px',
              height:'150px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: '#fff',
              border: '2px solid #80807c',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3d1e3'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
            <IonCardHeader
              style={{
                backgroundColor: '#b5f5f2',
                padding: '16px',
                textAlign: 'center'
              }}>
              <IonCardTitle style={{ margin: '0' }} onClick={() => handleProjectClick(project.id)}>
                Project ID: {project.id}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{color:'black' }}>
              <p style={{ margin: '0', textAlign: 'center',fontSize:20 }}>
                Project Name: {project.name} </p>
              <p style={{ margin: '0', textAlign: 'center',fontSize:20 ,}}>
                Users: {project.users}</p>
            </IonCardContent>
            </IonCard>
            ))}
        </div>
    </IonContent>
    </>
    );
};
export default Projects;
