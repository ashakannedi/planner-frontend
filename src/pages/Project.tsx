import React from 'react';
import './Project.css';
import { IonIcon } from '@ionic/react';
import { clipboardOutline, personOutline } from 'ionicons/icons';

function Project() {
    return (
        <div className="project-container-field">
            <form className="project-form-field">
                <h2>Project Details</h2>
                <div className="form-group-field">
                    <IonIcon icon={clipboardOutline} className="input-icon-field bright-icon" />
                    <input type="text" id="projectId" required placeholder=" " />
                    <label htmlFor="projectId">Project Id</label>
                </div>
                <div className="form-group-field">
                    <IonIcon icon={clipboardOutline} className="input-icon-field bright-icon" />
                    <input type="text" id="projectName" required placeholder=" " />
                    <label htmlFor="projectName">Project Name</label>
                </div>
                <div className="form-group-field">
                    <IonIcon icon={personOutline} className="input-icon-field bright-icon" />
                    <input type="text" id="userId" required placeholder=" " />
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
