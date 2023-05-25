import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import Cart from '../Components/Cart';

const CartPage = () => {
    return (
        <>
        <BreadCrumb value={'CART'} />
        <Cart />
        </>
    );
}

export default CartPage;
