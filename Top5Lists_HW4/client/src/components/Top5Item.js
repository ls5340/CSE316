import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [value, setValue] = useState(props.text);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering");
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving");
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleClick(event) {
        event.stopPropagation(); 
        handleToggleEdit(event);
    }

    function handleToggleEdit(event) {
        setValue(props.text);
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        else {
            store.setIsItemEditInactive();
        }
        setEditActive(newActive);
    }

    function handleUpdateText(event) {
        setValue(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }
    function handleBlur() {
        let { index } = props;
        store.addUpdateItemTransaction(index, value);
        handleToggleEdit();
    }

    let { index } = props;

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let text = <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>;
    if (editActive) {
        text = <TextField
            margin="normal"
            required
            fullWidth
            id={'item-' + (index+1)}
            className={itemClass}
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
            autoFocus
        />
    }

    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                className={itemClass}
                onDragStart={(event) => {
                    handleDragStart(event, (index+1))
                }}
                onDragOver={(event) => {
                    handleDragOver(event, (index+1))
                }}
                onDragEnter={(event) => {
                    handleDragEnter(event, (index+1))
                }}
                onDragLeave={(event) => {
                    handleDragLeave(event, (index+1))
                }}
                onDrop={(event) => {
                    handleDrop(event, (index+1))
                }}
                draggable="true"
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton 
                    aria-label='edit'
                    onClick={handleClick}
                    >
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                {text}
            </ListItem>
    )
}

export default Top5Item;