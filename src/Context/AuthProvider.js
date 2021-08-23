import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = React.createContext()
function AuthProvider({ children }) {
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

    function deleteAccount(){
        let user = auth.currentUser
        user.delete().then(()=>{
            console.log(" successfully deleted ");
            return true;
        }).catch((err)=>{         
        })
    }

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        deleteAccount
    }

    useEffect(() => {
        console.log("AuthProvider Use effect");

        const unsubs = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return (() => {
            unsubs();
        })

    }, [])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
