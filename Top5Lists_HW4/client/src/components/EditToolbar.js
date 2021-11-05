import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    let disableUndo = true;
    let disableRedo = true;
    if (store.canUndo())
        disableUndo = false;
    if (store.canRedo())
        disableRedo = false;

    return (
        <div id="edit-toolbar">
            <Button 
                id='undo-button'
                onClick={handleUndo}
                variant="contained"
                disabled={disableUndo}>
                    <UndoIcon />
            </Button>
            <Button 
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
                disabled={disableRedo}>
                    <RedoIcon />
            </Button>
            <Button 
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;