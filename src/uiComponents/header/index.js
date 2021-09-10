import React from 'react';

import './styles.scss';
import Miniature from '../../components/miniature';
import Menu from '../../components/menu';

import CookieWarning from '../../uiComponents/cookieWarning';

const Header = (props) => (
  <div className="header">
    <Miniature />
    <Menu activeTab={props.activeTab} />
    {/* Definitely not the best place */}
    <CookieWarning />
  </div>
);

export default Header;
