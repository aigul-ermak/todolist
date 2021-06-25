import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './Editablespan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function Todolist(props: propsTodoListType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID);
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasksJSXElements = props.tasks.map(t => {
        // let taskClass = t.isDone ? 'is-done' : '';
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)
        const removeTask = () => props.removeTask(t.id, props.todoListID);
        return (
            <div key={t.id}>
                <span className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                    size={'small'}
                    color={'primary'}
                    checked={t.isDone}
                    onChange={onChangeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    </span>
                {/*<span >{t.title}</span>*/}
                <IconButton onClick={removeTask} color={'secondary'}>
                    <Delete/>
                </IconButton>
            </div>
        )
    })

    const onAllClickHandler = () => props.changeTodoListFilter('all', props.todoListID);
    const onActiveClickHandler = () => props.changeTodoListFilter('active', props.todoListID);
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed', props.todoListID);
    const removeTodoList = () => props.removeTodoList(props.todoListID);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList} color={'secondary'}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTodoList}> X</button>*/}
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{listStyle:"none", padding:"0px"}}>
                {tasksJSXElements}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={'primary'}
                    size={'small'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={'primary'}
                    size={'small'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    size={'small'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
};
export default Todolist;


