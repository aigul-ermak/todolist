import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from './State/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './State/tasks-reducer';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithReducers() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();
    const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to do', filter: 'all'}
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID_1]: [
            {id: v1(), title: 'read', isDone: false},
            {id: v1(), title: 'cook', isDone: true},
            {id: v1(), title: 'sleep', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'walk', isDone: false},
            {id: v1(), title: 'run', isDone: false},
            {id: v1(), title: 'workout', isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        const action = removeTaskAC( taskID, todoListID)
        dispatchToTasks(action);
    }

    function addTask(title: string, todoListID: string) {
        const action = addTaskAC(title, todoListID)
        dispatchToTasks(action);
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskID, isDone, todoListID)
        dispatchToTasks(action);
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const action = changeTaskTitleAC(taskID, title, todoListID)
        dispatchToTasks(action);
    }


    function changeTodoListFilter(filter: FilterValuesType, todoListID: string) {
        const action = changeTodoListFilterAC(filter, todoListID)
        dispatchToTodolist(action);
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatchToTodolist(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title)
        dispatchToTasks(action);
        dispatchToTodolist(action);
    }


    function changeTodoListTitle(title: string, todoListID: string) {
        const action = changeTodoListTitleAC(title, todoListID)
        dispatchToTodolist(action);
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todoListID={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeTodoListFilter={changeTodoListFilter}
                                        addTask={addTask}
                                        filter={tl.filter}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
