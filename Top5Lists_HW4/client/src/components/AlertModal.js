import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import AuthContext from '../auth'
import Slide from '@mui/material/Slide'

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

const style_box = {
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export default function AlertModal() {
    const { auth } = useContext(AuthContext);

    const handleClose = () => {
        auth.alert(0);
    }

    let alerting = false;
    let text1 = "";
    let text2 = "";
    if (auth.alerting) {
        switch (auth.alerting) {
            case 1:
                text1 = "Missing required fields";
                text2 = "Please enter all required fields."
                break;
            case 2:
                text1 = "Password too short";
                text2 = "Please enter a password of at least 8 characters."
                break;
            case 3:
                text1 = "Confirm password"
                text2 = "Please enter the same password twice correctly."
                break;
            case 4:
                text1 = "Account already exists"
                text2 = "An account with this email address already exists."
                break;
            case 5:
                text1 = "Missing required fields";
                text2 = "Please enter all required fields.";
                break;
            case 6:
                text1 = "Account does not exist";
                text2 = "Please login with an existing email or create a new account."
                break;
            case 7:
                text1 = "Incorrect credentials";
                text2 = "Password is incorrect. Please try again."
                break;
            default:
                break;
        }   
        alerting = true;
    }

    return (
        <div>
        <Modal
            open={alerting}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Slide in={alerting} direction="right" >
            <Box sx={style_box}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               {text1}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {text2}
            </Typography>
            <Button onClick={handleClose}>Close</Button>
            </Box>
            </Slide>
        </Modal>
        </div>
    );
}