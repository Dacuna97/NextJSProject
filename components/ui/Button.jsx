import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './button.module.css';

const Button = ({ children, link, onClick }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired
};

export default Button;
