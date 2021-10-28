import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    if (auth.loggedIn) {
        console.log("we r logged");
        return <HomeScreen />
    }
    else {
        console.log("we r not logged");
        return <SplashScreen />
    }
}