import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://192.168.1.209:8080/tasks';

// Define the type for task data
export interface TaskData {
  id: string;
  name: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  percentage: string;
  priority: string;
  assignedDate: string;
  assignedDeadline: string;
}

// Fetch all tasks with callback
export const fetchTasks = (callback: (error: any, data?: TaskData[]) => void) => {
  axios.get(BASE_URL)
    .then(response => callback(null, response.data))
    .catch(error => callback(error));
};

// Fetch a single task by ID with callback
export const fetchTaskById = (id: string, callback: (error: any, data?: TaskData) => void) => {
  axios.get(`${BASE_URL}/${id}`)
    .then(response => callback(null, response.data))
    .catch(error => callback(error));
};

// Create a new task with callback
export const createTask = (task: TaskData, callback: (error: any, data?: TaskData) => void) => {
  axios.post(BASE_URL, task)
    .then(response => callback(null, response.data))
    .catch(error => callback(error));
};

// Update an existing task with callback
export const updateTask = (task: TaskData, callback: (error: any, data?: TaskData) => void) => {
  axios.put(`${BASE_URL}/${task.id}`, task)
    .then(response => callback(null, response.data))
    .catch(error => callback(error));
};

// Delete a task by ID with callback
export const deleteTask = (id: string, callback: (error: any) => void) => {
  axios.delete(`${BASE_URL}/${id}`)
    .then(() => callback(null))
    .catch(error => callback(error));
};
