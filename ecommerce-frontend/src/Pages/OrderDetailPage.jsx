import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import OrderDetail from '../Components/OrderDetail';

const OrderDetailPage = () => {
    return (
        <>
        <BreadCrumb value={'ORDER DETAIL'} />
        <OrderDetail />
        </>
    );
}

export default OrderDetailPage;
