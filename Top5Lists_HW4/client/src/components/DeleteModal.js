import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);

    const handleCancel = () => {
        store.unmarkListForDeletion();
    }

    const handleConfirm = () => {
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }

    let text1 = "";
    let text2 = "";
    if (store.listMarkedForDeletion) {
        text1 = "Delete Top5List " + store.listMarkedForDeletion.name + "?"
        text2 = "Are you sure you want to delete this list?"
    }

    return (
        <div>
        <Modal
            open={store.listMarkedForDeletion}
            onClose={handleCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            align="center"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" >
               {text1}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, margin: 2}} variant="h6">
                {text2}
            </Typography>
            <Button onClick={handleConfirm} variant="outlined" size="large">Confirm</Button>
            <Button onClick={handleCancel} variant="outlined" size="large">Close</Button>
            </Box>
        </Modal>
        </div>
    );
}