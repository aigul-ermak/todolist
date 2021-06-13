import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type propsTodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeTodoListFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: ( id: string, isDone: boolean) => void
}

function Todolist(props: propsTodoListType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false)

    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : '';
        return (
            <li>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={ (e) => props.changeTaskStatus(t.id, e.currentTarget.checked)}/>
                <span className={taskClass}>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>x
                </button>
            </li>
        )
    })
    const addTask = () => {
        const validatedTitle = title.trim()
        if(validatedTitle) {
            props.addTask(validatedTitle)
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
    const onAllClickHandler = () => props.changeTodoListFilter('all');
    const onActiveClickHandler = () => props.changeTodoListFilter('active');
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed');

    const errorMessage = error ? <div style={{color: 'red'}}>Title is reqiured!!!</div> : null


    return (
        <div>
            <h3>{props.title}</h3>
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


