import React from 'react';

import styles from './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

export default (props) => 
  <menu styles={styles}>
    <LinkUnderlined label="AGENDA" highlighted={props.activeTab==='agenda'}></LinkUnderlined>
    <LinkUnderlined label="ARTISTES" highlighted={props.activeTab==='artists'}></LinkUnderlined> 
    <LinkUnderlined label="EN SAVOIR +" highlighted={props.activeTab==='more'}></LinkUnderlined>
    <LinkUnderlined className='newletter' label="&#x261e; NEWSLETTER" highlighted={props.activeTab==='newsletter'}></LinkUnderlined>
    {/* <Newsletter /> */}
  </menu>