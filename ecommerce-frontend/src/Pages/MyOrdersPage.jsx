import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import MyOrders from '../Components/MyOrders';

const MyOrdersPage = () => {
    return (
        <>
        <BreadCrumb value={'MY ORDERS'} />
        <MyOrders />
        </>
    );
}

export default MyOrdersPage;
