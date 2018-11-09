import React from 'react';

import styles from './styles.scss';
import Miniature from '../miniature';
import Menu from '../menu';

export default (props) => 
  <header styles={styles}>
    <Miniature />
    <Menu />
  </header>