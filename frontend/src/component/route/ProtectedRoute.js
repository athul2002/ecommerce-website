import React from "react";
import { Navigate} from "react-router-dom";

function ProtectedRoute({isSignedIn,user,children})
{
    if(!isSignedIn)
    {
        return <Navigate to="/login" />;
    }
    if (user.role === true && user.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children

}


export default ProtectedRoute;