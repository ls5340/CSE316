import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    
    function handleUndo() {
        store.undo();
        store.updateToolBarButtons(1);
    }
    function handleRedo() {
        store.redo();
        store.updateToolBarButtons(1);
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isItemEditActive) {
        editStatus = true;
    }

    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className="top5-button-disabled">
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className="top5-button-disabled">
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className="top5-button-disabled">
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;