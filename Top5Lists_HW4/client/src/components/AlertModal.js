import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import AuthContext from '../auth'

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

export default function AlertModal() {
    const { auth } = useContext(AuthContext);
    const handleClose = () => {
        if (auth.alertingReg)
            auth.alert(1);
        else
            auth.alert(2);
    }

    let alerting = false;
    let text1 = "";
    let text2 = "";
    if (auth.alertingReg) {
        alerting = auth.alertingReg;
        text1 = "Missing required fields";
        text2 = "Please make sure to fill in all information"
    }
    else if (auth.alertingLog) {
        alerting = auth.alertingLog;
        text1 = "Wrong password";
        text2 = "Please make sure password is correct";
    }

    return (
        <div>
        <Modal
            open={alerting}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               {text1}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {text2}
            </Typography>
            <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
        </div>
    );
}