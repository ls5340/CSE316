import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    GUEST: "GUEST",
    ALERTING: "ALERTING",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        alerting: 0,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                });
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                });
            }
            case AuthActionType.GUEST: {
                return setAuth({
                    user: "Guest",
                    loggedIn: true,
                })
            }
            case AuthActionType.ALERTING: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    alerting: payload.alerting,
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try {
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
            else if (response.status === 400) {
                console.log("REGISTER BAD");
                this.alert(1);
            }
        }
        catch (e) {
            console.log(e.response);
            let err_msg = e.response.data.errorMessage;
            switch (err_msg) {
                case "Please enter all required fields.": 
                    this.alert(1);
                    break;
                case "Please enter a password of at least 8 characters.":
                    this.alert(2);
                    break;
                case "Please enter the same password twice.":
                    this.alert(3);
                    break;
                case "An account with this email address or username already exists.":
                    this.alert(4);
                    break;
                default:
                    break;
            }
        }
    }

    auth.loginUser = async function(userData, store) {
        try {
            const response = await api.loginUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                console.log("sucessssy??");
                history.push("/");
            }
            else if (response.status === 400) {
                console.log("LOGIN BAD");
                this.alert(2);
            }
        } catch (e) {
            console.log(e);
            let err_msg = e.response.data.errorMessage;
            console.log(err_msg);
            switch (err_msg) {
                case "Please enter all required fields.":
                    this.alert(5);
                    break;
                case "An account with this email address does not exist!":
                    this.alert(6);
                    break;
                case "Wrong password":
                    this.alert(7);
                    break;
                default:
                    break;
            }
        }
    }

    auth.logoutUser = async function(store) {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {

                }
            });
            store.logout();
            history.push("/");
        }
        else {
            console.log("logout fail");
        }
    }

    auth.guest = async function() {
        authReducer({
            type: AuthActionType.GUEST,
            payload: {

            }
        });
        history.push("/");
    }

    auth.alert = async function (num) {
        authReducer({
            type: AuthActionType.ALERTING,
            payload: {
                alerting: num
            }
        });
        
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };