import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material'

/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [value, setValue] = useState(props.text);

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
        console.log(store.currentFiltered);
        setValue(event.target.value);
        console.log(store.currentFiltered);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            handleBlur();
        }
    }
    function handleBlur() {
        let { index } = props;
        store.updateItem(index, value);
        handleToggleEdit();
    }

    let { index } = props;

    let text = <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>;
    if (editActive) {
        text = <TextField
            size="medium"
            margin="normal"
            sx={{height: '100%'}}
            fullWidth
            label="Top 5 Item Name"
            autoComplete="Top 5 Item Name"
            id={'item-' + (index+1)}
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            inputProps={{style: {fontSize: 36}}}
            InputLabelProps={{style: {fontSize: 24, color: 'black'}}}
            defaultValue={props.text}
            autoFocus
        />
    }

    return (
            <ListItem
                id={'item-' + (index+1)}
                key={props.key}
                draggable="true"
                sx={{ display: 'flex', textAlign: 'left', border: '2px', 
                borderRadius: '16px', bgcolor: 'yellow', width: '100%',
                height: '18%', fontSize: 36, mt: 1
            }}
            >
            <Box sx={{width: '100%'}}>
                <Typography onClick={handleClick} sx={{fontSize: 30, width: '100%'}}>
                    {text}
                </Typography>
            </Box>
            </ListItem>
    )
}

export default Top5Item;