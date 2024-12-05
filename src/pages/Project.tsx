import React, { useState } from 'react';
import './Project.css';
import { IonIcon } from '@ionic/react';
import { clipboardOutline, personOutline } from 'ionicons/icons';
import axios from 'axios';

function Project() {
    // State variables for form data
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [userId, setUserId] = useState('');

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const projectData = {
            // Use the state variable value
            projectName: projectName, // Use the state variable value
            userId: userId, // Use the state variable value
        };

        try {
            const response = await axios.post('http://localhost:8080/projects', projectData);
            console.log("Project saved successfully:", response.data);
            // Reset form fields after successful submission
            setProjectId('');
            setProjectName('');
            setUserId('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error saving project:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };
    return (
        <div className="project-container-field">
            <form className="project-form-field" onSubmit={handleSubmit}>
                <h2>Project Details</h2>
               
                <div className="form-group-field">
                    <IonIcon icon={clipboardOutline} className="input-icon-field bright-icon" />
                    <input 
                        type="text" 
                        id="projectName" 
                        required 
                        placeholder=" " 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)} 
                    />
                    <label htmlFor="projectName">Project Name</label>
                </div>
                <div className="form-group-field">
                    <IonIcon icon={personOutline} className="input-icon-field bright-icon" />
                    <input 
                        type="text" 
                        id="userId" 
                        required 
                        placeholder=" " 
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)} 
                    />
                    <label htmlFor="userId">User Id</label>
                </div>
                <div className="button-container-field">
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Project;