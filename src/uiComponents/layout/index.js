import React from 'react';
import globalStyles from './global.scss';

export default ({ children }) => (
  <div id="layout-global" style={globalStyles}>
    {children}
  </div>
);
