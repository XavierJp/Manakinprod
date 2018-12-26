import React from 'react';

import styles from './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

export default props => (
  <menu styles={styles}>
    <LinkUnderlined
      targetPath="agenda"
      label="AGENDA"
      highlighted={props.activeTab === 'agenda'}
    />
    <LinkUnderlined
      targetPath="artists"
      label="ARTISTES"
      highlighted={props.activeTab === 'artists'}
    />
    <LinkUnderlined
      targetPath="more"
      label="EN SAVOIR +"
      highlighted={props.activeTab === 'more'}
    />
    <LinkUnderlined
      className="newletter"
      label="&#x261e; NEWSLETTER"
      highlighted={props.activeTab === 'newsletter'}
    />
    {/* <Newsletter /> */}
  </menu>
);
