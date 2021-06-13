import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'read', isDone: false},
        {id: v1(), title: 'cook', isDone: true},
        {id: v1(), title: 'sleep', isDone: false},
        {id: v1(), title: 'walk', isDone: false},
        {id: v1(), title: 'run', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all');
    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    function changeTodoListFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function removeTask(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks)
    }

    function addTask(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    function changeTaskStatus(id: string, isDone: boolean) {
        const updatedTasks = tasks.map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks(updatedTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="What to do"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}/>

        </div>
    );
};

export default App;
