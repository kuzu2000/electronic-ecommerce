import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import MyAccount from '../Components/MyAccount';

const MyAccountPage = () => {
    return (
        <>
        <BreadCrumb value={'MY ACCOUNT'} />
        <MyAccount />
        </>
    );
}

export default MyAccountPage;
