import React from 'react';
import { Link } from 'gatsby';

export default ({
  to,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  className,
}) => (
  <Link
    to={to}
    style={style}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={className}
  >
    {children}
  </Link>
);
