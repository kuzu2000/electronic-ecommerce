import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import ProductList from '../Components/ProductList';

const ProductsPage = () => {
  return (
    <>
      <BreadCrumb value={'SHOP'} />
      <ProductList />
    </>
  );
};

export default ProductsPage;
