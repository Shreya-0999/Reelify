import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({component:Component, ...rest}) {
    console.log("Private Router");
    const {currentUser} = useContext(AuthContext);

    return (
        <Route {...rest} render= {props=>{
            return(
                currentUser ? <Component {...props}/> : <Redirect to = '/login'/>
            )
        }}

        />
    )
}

export default PrivateRoute
