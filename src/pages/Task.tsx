import React from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline, documentTextOutline, listOutline, calendarOutline, barChartOutline, starOutline, checkmarkCircleOutline, folderOutline } from 'ionicons/icons';
import './Task.css';

function Task() {
  return (
<<<<<<< HEAD
    <>
      <IonContent>
        <div className="task-form">
        <form>
          <h2>Task Form</h2>
          <div className="form-container">
=======
    <div className="task-form">
      <form>
        <h2>Task Form</h2>
        <div className="form-container">
         

          <div className="form-group">
            <IonIcon icon={documentTextOutline} className="input-icon" />
            <input type="text" id="name" name="name" required placeholder=" " />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-group">
            <IonIcon icon={documentTextOutline} className="input-icon" />
            <input type="text" id="description" name="description" required placeholder=" " />
            <label htmlFor="description">Description</label>
          </div>

          <div className="form-group">
            <IonIcon icon={listOutline} className="input-icon" />
            <select id="status" name="status" required>
              <option value="" hidden>Status</option>
              <option value="Started">Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <label htmlFor="status">Status</label>
          </div>

          <div className="date-time-group">
>>>>>>> cfbecdbf11c81fc3687ff2edf69ed03d53dc8e72
            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input type="date" id="startDate" name="startDate" required />
              <label htmlFor="startDate">Start Date</label>
            </div>

            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input type="date" id="endDate" name="endDate" required />
              <label htmlFor="endDate">End Date</label>
            </div>

            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input type="date" id="assignedDate" name="assignedDate" required />
              <label htmlFor="assignedDate">Assigned Date</label>
            </div>
          </div>

          <div className="form-group">
            <IonIcon icon={barChartOutline} className="input-icon" />
            <input type="number" id="percentage" name="percentage" placeholder=" " required min="0" max="100" />
            <label htmlFor="percentage">Percentage</label>
          </div>

          <div className="form-group">
            <IonIcon icon={starOutline} className="input-icon" />
            <select id="priority" name="priority" required>
              <option value="" hidden>Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <label htmlFor="priority">Priority</label>
          </div>

          <div className="form-group">
            <IonIcon icon={calendarOutline} className="input-icon" />
            <input type="date" id="deadline" name="deadline" required />
            <label htmlFor="deadline">Deadline</label>
          </div>

          <div className="form-group">
            <IonIcon icon={checkmarkCircleOutline} className="input-icon" />
            <select id="complete" name="complete" required>
              <option value="" hidden>Select Complete</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label htmlFor="complete">Complete</label>
          </div>

          <div className="form-group">
            <IonIcon icon={folderOutline} className="input-icon" />
            <input type="text" id="projectId" name="projectId" required placeholder=" " />
            <label htmlFor="projectId">Project Id</label>
          </div>

          <div className="form-group">
            <IonIcon icon={personOutline} className="input-icon" />
            <input type="text" id="userId" name="userId" required placeholder=" " />
            <label htmlFor="userId">User Id</label>
          </div>
        </div>
<<<<<<< HEAD
    </IonContent>
    </>
=======

        <button type="submit" className="btn-submit">Submit Task</button>
      </form>
    </div>
>>>>>>> cfbecdbf11c81fc3687ff2edf69ed03d53dc8e72
  );
}

export default Task;