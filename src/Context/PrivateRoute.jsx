import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/Loader/Loader';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const {pathname}= useLocation();

    if(loading){
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children;
    }

    return <Navigate state={pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;