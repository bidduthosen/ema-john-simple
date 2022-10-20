import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from'firebase/auth';
import app from '../components/firebase/Firebase.config';

const auth = getAuth(app);

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    // register createUserWithEmailAndPassword---
    const createUser = (email, password) =>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // signInWithEmailAndPassword-----
    const logIn = (email, password) =>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // signout----
    const logOut = () =>{
        setLoader(true);
        return signOut(auth);
    }
    // signInWithPopup---
    const signInGoogle =()=>{
        return signInWithPopup(auth, googleProvider);
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            console.log(currentUser);
            setLoader(false);
        })
        return ()=> unSubscribe();
    },[])

    const authInfo = {user, loader, createUser, logIn, logOut, signInGoogle};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;