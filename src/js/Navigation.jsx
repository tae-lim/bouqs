import React from 'react';

import { Navbar } from 'react-bootstrap';

const Navigation = props => {
  return (
    <Navbar bg="light">
      <h1>The Bouqs</h1>
      <div className="navbar-items">
        <a href="#" onClick={() => props.handleAppViewChange('category')}>Categories</a>
        <a href="#" onClick={() => props.handleAppViewChange('cart')}>Cart</a>
      </div>
    </Navbar>
  );
};

export default Navigation;