import React from 'react';
import '../../App.css'
import PropTypes from 'prop-types';

function Navbar({title, icon}) {
  return (
    <nav className={'navbar bg-primary'}>
      <h1>
        <i className={icon}/>
        {title}
      </h1>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
