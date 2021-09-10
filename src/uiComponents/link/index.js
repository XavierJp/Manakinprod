import React from 'react';
import { Link } from 'gatsby';

const ImprovedLink = ({
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
export default ImprovedLink;
