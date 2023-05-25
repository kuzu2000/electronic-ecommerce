import React from 'react';
import BreadCrumb from '../Components/BreadCrumb';
import Register from '../Components/Register';
const RegisterPage = () => {
  return (
    <>
      <BreadCrumb value={'REGISTER'} />
      <Register />
    </>
  );
};

export default RegisterPage;
