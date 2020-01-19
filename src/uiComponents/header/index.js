import React from 'react';

import './styles.scss';
import Miniature from '../../components/miniature';
import Menu from '../../components/menu';

import CookieWarning from '../../uiComponents/cookieWarning';

export default props => (
  <div className="header">
    <Miniature />
    <Menu activeTab={props.activeTab} />
    {/* Definitely not the best place */}
    <CookieWarning />
  </div>
);
