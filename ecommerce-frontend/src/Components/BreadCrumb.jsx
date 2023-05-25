import React from 'react';
import { Link } from 'react-router-dom'
const BreadCrumb = ({value}) => {
  return (
    <div className="bread-crumb">
      <Link style={{opacity: 0.6}} to="/" className="bread-crumb-item link">
        HOME
      </Link>
      <span>/</span>
      <div className="bread-crumb-item link">
       {value}
      </div>
    </div>
  );
};

export default BreadCrumb;
