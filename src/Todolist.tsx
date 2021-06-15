import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

function Todolist(props: propsTodoListType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : '';
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
        const removeTask = () => props.removeTask(t.id, props.todoListID);
        return (
            <li>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeTaskStatus}/>
                <span className={taskClass}>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onkeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeTodoListFilter('all', props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter('active', props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed', props.todoListID);

    const errorMessage = error ? <div style={{color: 'red'}}>Title is reqiured!!!</div> : null


    return (
        <div>
            <h3>{props.title}<button onClick={ () => props.removeTodoList(props.todoListID)}>X</button></h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onkeyPressAddTask}/>
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
};
export default Todolist;


