import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './button.module.css';

const Button = ({ children, link }) => {
  return (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  link: PropTypes.string.isRequired
};

export default Button;
