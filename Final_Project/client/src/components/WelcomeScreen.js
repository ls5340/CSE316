import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../auth';


export default function WelcomeScreen() {
    const { auth } = useContext(AuthContext);

    function handleGuest() {
        auth.guest();
    }
    return (
        <div id="welcome-screen">
            <Typography sx={{ fontSize: 64, color: 'yellow', height: 85 }}> Welcome to Top 5 Lister! </Typography>
            <Typography sx={{ fontSize: 32, color: 'red' }}> A community where users can create and view Top 5 Lists </Typography>
            <Typography sx={{ fontSize: 16, mt: 2 }}> Developed by David Huang </Typography>
            <br />
            <br />
            <Box sx={{ height: 64 }}> 
                <Link to='/login/' >
                    <Button variant="contained" sx={{ width: 256, fontSize: 16, color: 'black', backgroundColor: '#abdba0' }}>Login</Button>
                </Link>
            </Box>
            <Box sx={{ height: 64 }}> 
                <Link to='/register/' >
                    <Button variant="contained" sx={{ width: 256, fontSize: 16, color: 'black', backgroundColor: '#abdba0' }}>Create Account</Button>
                </Link>
            </Box>
            <Box sx={{ height: 64 }}> 
                <Link to='/' >
                    <Button onClick={handleGuest} variant="contained" sx={{ width: 256, fontSize: 16, color: 'black', backgroundColor: '#abdba0' }}>Continue as Guest</Button>
                </Link>
            </Box>
        </div>
    )
}