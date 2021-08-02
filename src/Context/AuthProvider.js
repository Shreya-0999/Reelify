import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext()
function AuthProvider({ children }) {
    console.log("Auth Provider Function Starts");
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut();
    }

    const value = {
        currentUser,
        signUp,
        login,
        logout
    }

    useEffect(() => {
        console.log("AuthProvider Use effect");

        const unsubs = auth.onAuthStateChanged(user => {
            console.log("onAuthStateChanged in provider")
            setCurrentUser(user);
            setLoading(false);
        })
        return (() => {
            unsubs();
        })

    }, [])

    return (
        <AuthContext.Provider value={value}>
            {console.log("AuthContext.Provider Running")}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
