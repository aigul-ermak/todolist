import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './Editablespan';

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
    changeTaskTitle: (taskID: string, title: string,  todoListID: string) => void
}

function Todolist(props: propsTodoListType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID);

    const tasksJSXElements = props.tasks.map(t => {
        let taskClass = t.isDone ? 'is-done' : '';
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title,  props.todoListID)
        const removeTask = () => props.removeTask(t.id, props.todoListID);
        return (
            <li className={taskClass}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<span >{t.title}</span>*/}
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const onAllClickHandler = () => props.changeTodoListFilter('all', props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter('active', props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed', props.todoListID);

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.todoListID)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
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


