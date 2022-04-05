import { useState, createContext } from "react";
import {v4 as uuidv4 } from "uuid";
import TaskData from "../tasks/TaskData";

const TaskContext = createContext();

export const TaskProvider = ({children}) => {
    const [taskList, setTaskList] = useState(TaskData);
    const [taskEdit, setTaskEdit] = useState({   task: {}, 
        edit: false});

    //to fetch the task data
    const fetchTask = async () => {
        const response = await fetch(`http://localhost:5000/tasks?_sort=id&order=desc`);

        const data = response.json();
        setTaskList(data);
    }
    

    //to delete the task
    const deleteTask = (id) => {
        setTaskList(taskList.filter((task) => task.id !== id));
    }

    //to check the task
    const checkTask = (id) => {
    setTaskList(
        taskList.map((task) => 
        task.id === id ? { ...task, checked: !task.checked} : task
        )
    );
    };

    // to add a task
    const addTask = (newTask) => {
        newTask.id = uuidv4();
        setTaskList([newTask, ...taskList]);
    };

    //edit the task
    const editTask = (task) => {
        setTaskEdit({task, edit: true});
    }

    //to update the task
    const updateTask = (id, updTask) => {
        setTaskList (
            taskList.map((task) => 
            task.id === id ? { ...task, ...updTask } : task
            )
        );
    }

    return (
    <TaskContext.Provider value = {{taskList, checkTask, deleteTask, addTask, editTask, updateTask, taskEdit }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;