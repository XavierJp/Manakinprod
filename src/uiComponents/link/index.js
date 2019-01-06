import React from 'react';


const Link = ({to, children, style, onMouseEnter, onMouseLeave, className}) => (
    <a href={to} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={className}>
        {children}
    </a>
);

export default Link;