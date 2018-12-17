  import React from 'react';
  import styles from './styles.scss';
  import logo_manakin from '../../resources/logo_centered.png';

  export default () => 
  <div styles={styles} className="logo">
    <a href="/">
      <img
        alt="MANAKIN PRODUCTION"
        src={logo_manakin}/>
    </a>
    <p><b>MANAKIN</b> <span className="separator">&#x2022;</span> <a href="/more" className="bracket"> plateforme de production </a><br />
    Lauren Boyer & Leslie Perrin<br />
    Paris 18e<br />
    </p>
  </div>


