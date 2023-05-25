import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import Shipping from '../Components/Shipping';

const ShippingPage = () => {
    return (
        <>
        <BreadCrumb value={'SHIPPING'} />
        <Shipping />
        </>
    );
}

export default ShippingPage;
