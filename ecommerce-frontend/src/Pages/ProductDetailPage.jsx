import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import ProductDetail from '../Components/ProductDetail';

const ProductDetailPage = () => {
    return (
        <>
        <BreadCrumb value={'PRODUCT PAGE'} />
        <ProductDetail />
        </>
    );
}

export default ProductDetailPage;
