import React from 'react';

import styles from './styles.scss';
import Miniature from '../../components/miniature';
import Menu from '../../components/menu';

export default props => (
  <header styles={styles}>
    <Miniature />
    <Menu activeTab={props.activeTab} />
  </header>
);
