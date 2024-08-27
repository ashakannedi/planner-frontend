import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonSelect, IonSelectOption, IonDatetimeButton, IonModal ,IonDatetime } from '@ionic/react';
import { Link } from 'react-router-dom';
import './Home.css';

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
  
  const handleDateChange = (e: CustomEvent, fieldname: string) => {
    const selectedDate = e.detail.value;

    if (editIndex !== null) {
      setEditedTask(prevState => ({
        ...prevState,
        [fieldname]: selectedDate,
      }));
    } else {
      setNewTask(prevState => ({
        ...prevState,
        [fieldname]: selectedDate,
      }));
    }

    setShowModal({ modal: false, field: '' }); // Close the modal after selection
  };

  const openModal = (fieldname: string) => {
    setShowModal({ modal: true, field: fieldname });
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
    console.log("newly added task is ", newTask);
    setNewTask({}); // Clear new task input fields
  };

  return (
    <IonPage>
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
                <td><Link to={`/taskpage/${task.id}`}>{task.id}</Link></td>
                {editIndex === index ? (
                  <>
                    <td><IonInput name="name" value={editedTask.name || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="title" value={editedTask.title || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="description" value={editedTask.description || ''} onIonInput={handleInputChange} /></td>
                    <td><IonDatetime name="startDate" value={editedTask.startDate || ''} onIonChange={(e: CustomEvent) => handleDateChange(e, "startDate")} /></td>
                    <td><IonDatetime name="endDate" value={editedTask.endDate || ''} onIonChange={ (e: CustomEvent) => handleDateChange(e, "endDate")} /></td>
                    <td><IonInput name="status" value={editedTask.status || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="percentage" value={editedTask.completed || ''} onIonInput={handleInputChange} /></td>
                    <td><IonInput name="priority" value={editedTask.priority || ''} onIonInput={handleInputChange} /></td>
                   <td><IonDatetime name="assignedDate" value={editedTask.assignDate || ''} onIonChange={ (e:CustomEvent) =>handleDateChange(e, "assignDate")} /></td> 
                    <td><IonDatetime name="assignedDeadline" value={editedTask.deadLine || ''} onIonChange={(e:CustomEvent)=> handleDateChange(e," deadLine")} /></td> 
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
                    <><IonButton onClick={saveChanges}>Save</IonButton><IonButton onClick={cancelEditing}>Cancel</IonButton></>
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

              <td>
                <IonDatetimeButton onClick={() => openModal("startDate")}>
                  {newTask.startDate || 'Select a Date'}
                </IonDatetimeButton>
                <IonModal isOpen={showModal.modal && showModal.field === "startDate"} onDidDismiss={() => setShowModal({ modal: false, field: '' })} keepContentsMounted={true}>
                  <IonButton slot="start" onClick={() => setShowModal({ modal: false, field: '' })}> Close </IonButton>
                  <IonDatetime onIonChange={(e: CustomEvent) => handleDateChange(e, "startDate")}/>
                </IonModal>
              </td>

              <td>
                <IonDatetimeButton onClick={() => openModal("endDate")}>
                  {newTask.endDate || 'Select a Date'}
                </IonDatetimeButton>
                <IonModal isOpen={showModal.modal && showModal.field === "endDate"} onDidDismiss={() => setShowModal({ modal: false, field: '' })} keepContentsMounted={true}>
                  <IonButton slot="start" onClick={() => setShowModal({ modal: false, field: '' })}> Close </IonButton>
                  <IonDatetime onIonChange={(e: CustomEvent) => handleDateChange(e, "endDate")}/>
                </IonModal>
              </td>

              <td> 
                <IonSelect
                  name="status"
                  value={newTask.status || ''}
                  onIonChange={handleStatusChange}
                interface='popover'
                placeholder='select'>
                  {statusOptions.map(option => (
                    <IonSelectOption key={option} value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect></td>
              <td><IonInput name="percentage" value={newTask.completed || ''} onIonInput={handleNewTaskChange} placeholder="Percentage" /></td>
              <td><IonSelect
                  name="priority"
                  value={newTask.priority || ''}
                  onIonChange={handlePriorityChange}
                interface='popover'placeholder="Priority">
                  {priorityOptions.map(option => (
                    <IonSelectOption key={option} value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect></td>
                <td><IonDatetimeButton datetime="startdate" onClick={() => openModal("startDate")}>
                {startdate || 'Select a Date'}</IonDatetimeButton>
              <IonModal isOpen={showModal.modal && showModal.field === "startDate"} onDidDismiss={() => setShowModal({ modal: false, field: '' })} keepContentsMounted={true}>
              <IonButton slot="start" onClick={() => setShowModal({ modal: false, field: '' })}> Close </IonButton>
                <IonDatetime id="startdate" onIonChange={(e: CustomEvent) => handleDateChange(e, "startDate")}/></IonModal></td>


                <td><IonDatetimeButton datetime="startdate" onClick={() => openModal("startDate")}>
                {startdate || 'Select a Date'}</IonDatetimeButton>
              <IonModal isOpen={showModal.modal && showModal.field === "startDate"} onDidDismiss={() => setShowModal({ modal: false, field: '' })} keepContentsMounted={true}>
              <IonButton slot="start" onClick={() => setShowModal({ modal: false, field: '' })}> Close </IonButton>
                <IonDatetime id="startdate" onIonChange={(e: CustomEvent) => handleDateChange(e, "startDate")}/></IonModal></td>

              <td> 
                <IonButton onClick={addNewTask}>Add</IonButton>
              </td>
            </tr>
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
};

export default Home;
