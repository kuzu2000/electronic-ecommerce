import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import Login from '../Components/Login';

const LoginPage = () => {
    return (
        <>
        <BreadCrumb value={'LOGIN'} />
        <Login />
        </>
    );
}

export default LoginPage;
