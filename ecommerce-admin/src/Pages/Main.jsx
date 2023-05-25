import React from 'react';
import Sidebar from './Sidebar';

const Main = (props) => {
  return (
    <div className="main">
      <Sidebar />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Main;
