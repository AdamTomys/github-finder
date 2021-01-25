import React from 'react';
import '../../App.css'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

function Navbar({title, icon}) {
  return (
    <nav className={'navbar bg-primary'}>
      <h1>
        <i className={icon}/>
        {title}
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
