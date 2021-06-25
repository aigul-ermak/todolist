import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


type addTaskFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: addTaskFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onkeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItem(validatedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    // const errorMessage = error ? <div style={{color: 'red'}}>Title is reqiured!!!</div> : null
    return (
        <div>
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onkeyPressAddItem}
            label={"Title"}
            helperText={error && "Title is reqiured!!!"}/>
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeTitle}*/}
            {/*    onKeyPress={onkeyPressAddItem}/>*/}
            <IconButton onClick={addItem} color={'primary'}>
                <AddBox/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
}


export default AddItemForm;
