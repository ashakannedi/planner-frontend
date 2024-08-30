import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonSelect, IonSelectOption, IonDatetime} from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

// Define the type for task data
interface TaskData {
  id: string;
  name: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  completed: string;
  priority: string;
  assignDate: string;
  deadLine: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([
    
  ]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<TaskData>>({});
  const [newTask, setNewTask] = useState<Partial<TaskData>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState({ modal: false, field: '' });
  const[startdate,setStartDate] = useState(null);
  const[enddate,setEndDate] = useState(null);
  const[assignDate,setAssignedDate] = useState(null);
  const[assigneddeadline,setAssignedDeadline] = useState(null)

  const statusOptions = ['Started', 'In Progress', 'Completed'];
  const priorityOptions = ['High', 'Medium', 'Low'];

  // Start editing a task
  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditedTask({ ...tasks[index] });
  };

  // Handle input change
  const handleInputChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewTaskChange = (e: CustomEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (event: CustomEvent) => {
    const value = event.detail.value;
    if (editIndex !== null) {
      setEditedTask(prevState => ({
        ...prevState,
        status: value,
      }));
    } else {
      setNewTask(prevState => ({
        ...prevState,
        status: value,
      }));
    }
  };
  const handleDateChange = (e: CustomEvent, field: keyof TaskData) => {
    const value = e.detail.value as string;
    if (editIndex !== null) {
      setEditedTask(prevState => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setNewTask(prevState => ({
        ...prevState,
        [field]: value,
      }));
    }
  };


  const handlePriorityChange = (event: CustomEvent) => {
    const value = event.detail.value;
    if (editIndex !== null) {
      setEditedTask(prevState => ({
        ...prevState,
        priority: value,
      }));
    } else {
      setNewTask(prevState => ({
        ...prevState,
        priority: value,
      }));
    }
  };

  // Save changes
  const saveChanges = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...tasks[editIndex], ...editedTask } as TaskData;
      setTasks(updatedTasks);
      setEditIndex(null);
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditIndex(null);
    setEditedTask({});
  };

  const addNewTask = () => {
    const newTaskId = (tasks.length + 1).toString().padStart(2, '0');
    setTasks([...tasks, { ...newTask, id: newTaskId } as TaskData]);
    setNewTask({}); // Clear new task input fields
  };

  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/userDetails/logout", {}, { withCredentials: true });
      history.push('/login?logout=true'); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
   
      <IonContent>
        <table className="my-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Percentage</th>
              <th>Priority</th>
              <th>Assigned Date</th>
              <th>Assigned Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td><Link to={`/details/${task.id}`}>{task.id}</Link></td>
                {editIndex === index ? (
                  <>
                    <td><IonInput name="name" value={editedTask.name || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="title" value={editedTask.title || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="description" value={editedTask.description || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="startDate" value={editedTask.startDate || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="endDate" value={editedTask.endDate || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="status" value={editedTask.status || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="percentage" value={editedTask.completed || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="priority" value={editedTask.priority || ''} onIonInput={handleInputChange} /></td>
                   <td><IonDatetime name="assignedDate" value={editedTask.assignDate || ''} onIonChange={ (e:CustomEvent) =>handleDateChange} /></td> 
                    <td><IonDatetime name="assignedDeadline" value={editedTask.deadLine || ''} onIonChange={(e:CustomEvent)=> handleDateChange} /></td> 
                  </>
                ) : (
                  <>
                    <td>{task.name}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.startDate}</td>
                    <td>{task.endDate}</td>
                    <td>{task.status}</td>
                    <td>{task.completed}</td>
                    <td>{task.priority}</td>
                    <td>{task.assignDate}</td>
                    <td>{task.deadLine}</td>
                  </>
                )}
                <td>
                  {editIndex === index ? (
                    <>
                      <IonButton onClick={saveChanges}>Save</IonButton>
                      <IonButton onClick={cancelEditing}>Cancel</IonButton>
                    </>
                  ) : (
                    <IonButton onClick={() => startEditing(index)}>Edit</IonButton>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td><IonInput name="id" value={newTask.id || ''} onIonInput={handleNewTaskChange} placeholder="id" /></td>
              <td><IonInput name="name" value={newTask.name || ''} onIonInput={handleNewTaskChange} placeholder="Name" /></td>
              <td><IonInput name="title" value={newTask.title || ''} onIonInput={handleNewTaskChange} placeholder="Title" /></td>
              <td><IonInput name="description" value={newTask.description || ''} onIonInput={handleNewTaskChange} placeholder="Description" /></td>
              <td><IonInput name="startDate" value={newTask.startDate || ''} onIonInput={handleNewTaskChange} placeholder="Start Date" /></td>
              <td><IonInput name="endDate" value={newTask.endDate || ''} onIonInput={handleNewTaskChange} placeholder="End Date" /></td>
              <td>
                <IonSelect
                  name="status"
                  value={newTask.status || ''}
                  onIonChange={handleStatusChange}
                  interface='popover'
                  placeholder='Status'
                >
                  {statusOptions.map(option => (
                    <IonSelectOption key={option} value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect>
              </td>
              <td><IonInput name="percentage" value={newTask.completed || ''} onIonInput={handleNewTaskChange} placeholder="Percentage" /></td>
              <td>
                <IonSelect
                  name="priority"
                  value={newTask.priority || ''}
                  onIonChange={handlePriorityChange}
                  interface='popover'
                  placeholder='Priority'
                >
                  {priorityOptions.map(option => (
                    <IonSelectOption key={option} value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect>
              </td>
              <td><IonInput name="assignedDate" value={newTask.assignDate || ''} onIonInput={handleNewTaskChange} placeholder="Assigned Date" /></td>
              <td><IonInput name="assignedDeadline" value={newTask.deadLine || ''} onIonInput={handleNewTaskChange} placeholder="Assigned Deadline" /></td>
              <td>
                <IonButton onClick={addNewTask}>Add</IonButton>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </IonContent>
   
  );
};

export default Home;