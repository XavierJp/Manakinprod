  import React from 'react';
  import styles from './styles.scss';
  import logo_manakin from '../../resources/logo_centered.png';
  import { Link } from '@reach/router';

  export default () => 
  <div styles={styles} className="logo">
    <Link to="/">
      <img
        alt="MANAKIN PRODUCTION"
        src={logo_manakin}/>
    </Link>
    <p>MANAKIN <span className="separator">&#x2022;</span> <span className="bracket"> plateforme de production </span><br />
    Lauren Boyer & Leslie Perrin<br />
    Paris 18e<br />
    </p>
  </div>


