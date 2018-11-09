import React from 'react';

import styles from './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

export default (props) => 
  <menu styles={styles}>
    <LinkUnderlined label="AGENDA"></LinkUnderlined>
    <LinkUnderlined label="ARTISTES"></LinkUnderlined> 
    <LinkUnderlined label="EN SAVOIR +"></LinkUnderlined>
    <LinkUnderlined label="&#x261e; NEWSLETTER"></LinkUnderlined>
    {/* <Newsletter /> */}
  </menu>