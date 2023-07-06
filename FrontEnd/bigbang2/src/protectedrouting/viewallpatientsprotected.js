import { Navigate } from "react-router-dom";

function ViewAllPatientsProtected({token,children})
{
    token=localStorage.getItem("token");
    if(token!=null)
        return children;
    return <Navigate to='/'/>
}

export default ViewAllPatientsProtected;