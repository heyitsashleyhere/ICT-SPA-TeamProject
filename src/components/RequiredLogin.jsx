import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'



const RequiredLogin = ({ children, redirectTo }) => {
// let { username } = useParams();
  const { currentUser } = useContext(UserContext);

  return currentUser
       ? children
       : <Navigate to={redirectTo} />;
}

export default RequiredLogin