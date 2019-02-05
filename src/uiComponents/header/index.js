import React from 'react';

import './styles.scss';
import Miniature from '../../components/miniature';
import Menu from '../../components/menu';

export default props => (
  <div className="header">
    <Miniature />
    <Menu activeTab={props.activeTab} />
  </div>
);
