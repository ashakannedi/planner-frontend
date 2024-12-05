import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline, documentTextOutline, listOutline, calendarOutline, barChartOutline, starOutline, checkmarkCircleOutline, folderOutline } from 'ionicons/icons';
import './Task.css';

interface FormData {
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  assignDate: string;
  priority: string;
  deadLine: string;
  completed: string; // Changed from 'complete' to 'completed'
  project:{
    id:string;
  }
  userDetails:{
    id:string;
  }
}

function Task() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    status: '',
    startDate: '',
    endDate: '',
    assignDate: '',
    priority: '',
    deadLine: '',
    completed: '',
    project:
    {
      id:'',
    } ,
    userDetails:{
      id:'',
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "project" || name === "userDetails") {
      setFormData({
        ...formData,
        [name]: {
          ...formData[name],
          id: value,
        },
      });
    } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const apiEndpoint = 'http://localhost:8080/tasks';

    // Convert dates to ISO 8601 format if needed
   const formatDate = (date: string) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString(); // Format to 'yyyy-MM-ddTHH:mm:ss.sssZ'
};

    const formattedData = {
      ...formData,
      startDate: formatDate(formData.startDate),
      endDate: formatDate(formData.endDate),
      assignDate: formatDate(formData.assignDate),
      deadLine: formatDate(formData.deadLine),
    };

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit the form: ${errorText}`);
    }

    const result = await response.json();
    console.log('Form submitted successfully:', result);
    alert('Task created successfully!');

    // Clear the form or redirect as needed
    setFormData({
      title: '',
      description: '',
      status: '',
      startDate: '',
      endDate: '',
      assignDate: '',
     
      priority: '',
      deadLine: '',
      completed: '',
      project:
      {
        id:'',
      } ,
      userDetails:{
        id:'',
      }
    });
  } catch (error) {
    console.error('Failed to submit the form:', error);
    alert('Failed to submit the form. Please try again.');
  }
};


  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <h2>Task Form</h2>
        <div className="form-container">
          <div className="form-group">
            <IonIcon icon={documentTextOutline} className="input-icon" />
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-group">
            <IonIcon icon={documentTextOutline} className="input-icon" />
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="description">Description</label>
          </div>

          <div className="form-group">
            <IonIcon icon={listOutline} className="input-icon" />
           

            <input
              type="text"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="status">Status</label>
          </div>

          <div className="date-time-group">
            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="startDate">Start Date</label>
            </div>

            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="endDate">End Date</label>
            </div>

            <div className="form-group">
              <IonIcon icon={calendarOutline} className="input-icon" />
              <input
                type="date"
                id="assignDate"
                name="assignDate"
                value={formData.assignDate}
                onChange={handleChange}
                required
              />
              <label htmlFor="assignDate">Assign Date</label>
            </div>
          </div>

          

          <div className="form-group">
            <IonIcon icon={starOutline} className="input-icon" />
            

            <input
              type="text"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="priority">Priority</label>


          </div>

          <div className="form-group">
            <IonIcon icon={calendarOutline} className="input-icon" />
            <input
              type="date"
              id="deadLine"
              name="deadLine"
              value={formData.deadLine}
              onChange={handleChange}
              required
            />
            <label htmlFor="deadline">DeadLine</label>
          </div>

          <div className="form-group">
            <IonIcon icon={checkmarkCircleOutline} className="input-icon" />
           
            <input
              type="number"
              id="completed"
              name="completed"
              value={formData.completed}
              onChange={handleChange}
              placeholder=" "
              required
              min="0"
              max="100"
            />
            <label htmlFor="complete">Complete</label>
          </div>

          <div className="form-group">
            <IonIcon icon={folderOutline} className="input-icon" />
            <input
              type="text"
              id="project"
              name="project"
              value={formData.project.id}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="projectId">Project Id</label>
            
          </div>

          <div className="form-group">
            <IonIcon icon={personOutline} className="input-icon" />
            <input
              type="text"
              id="userDetails"
              name="userDetails"
              value={formData.userDetails.id}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label htmlFor="userId">User Id</label>
          </div>
        </div>
        <button type="submit" className="btn-submit">
          Submit Task
        </button>
      </form>
    </div>
  );
}

export default Task;
