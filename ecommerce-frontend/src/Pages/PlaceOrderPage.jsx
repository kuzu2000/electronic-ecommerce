import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import PlaceOrder from '../Components/PlaceOrder';

const PlaceOrderPage = () => {
    return (
        <>
        <BreadCrumb value={'PLACE ORDER'} />
        <PlaceOrder />
        </>
    );
}

export default PlaceOrderPage;
