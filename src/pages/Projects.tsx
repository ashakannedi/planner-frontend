import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonLoading,
    IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  name: string; // Assuming you want to display user names
}

interface Project {
  id: string;
  name: string;
  users: User[]; // Changed to an array of users
}


const Projects: React.FC = () => {
    const history = useHistory();
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:8080/projects');
                setProjects(response.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to fetch projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
            <IonContent style={{ backgroundImage: 'url(public/assets/icon/img.png)' }}>
                {loading ? (
                    <IonLoading isOpen={loading} message={'Loading projects...'} />
                ) : error ? (
                    <IonText color="danger" style={{ textAlign: 'center' }}>
                        {error}
                    </IonText>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px',
                            justifyContent: 'center',
                            padding: '16px',
                        }}>
                        {projects.map((project) => (
                            <IonCard
                                key={project.id}
                                style={{
                                    width: '350px',
                                    height: '150px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    backgroundColor: '#fff',
                                    border: '2px solid #80807c',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 1, 0.1)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e3d1e3')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                                onClick={() => handleProjectClick(project.id)}>
                                <IonCardHeader
                                    style={{
                                        backgroundColor: '#b5f5f2',
                                        padding: '16px',
                                        textAlign: 'center',
                                    }}>
                                    <IonCardTitle style={{ margin: '0' }}>
                                        Project ID: {project.id}
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent style={{ color: 'black' }}>
                                    <p style={{ margin: '0', textAlign: 'center', fontSize: 20 }}>
                                        Project Name: {project.name}
                                    </p>
                                    <p style={{ margin: '0', textAlign: 'center', fontSize: 20 }}>
    Users: {project.users.length > 0 ? project.users.map(user => `ID: ${user.id}`).join(', ') : 'No users'}
</p>

                                </IonCardContent>
                            </IonCard>
                        ))}
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default Projects;
