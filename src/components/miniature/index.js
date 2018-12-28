import React from 'react';
import styles from './styles.scss';
import { Link } from 'gatsby';
import logo_manakin from '../../resources/logo_centered.png';

export default () => (
  <div styles={styles} className="logo">
    <Link to="/">
      <img alt="MANAKIN PRODUCTION" src={logo_manakin} />
    </Link>
    <div>
      <p>
        <Link to="/">
          <b>MANAKIN</b>
        </Link>{' '}
        <span className="separator">&#x2022;</span>{' '}
        <span to="/more" className="bracket">
          {' '}
          <Link to="/more">plateforme de production</Link>{' '}
        </span>
        <br />
      </p>
      <div>Paris 18e, 15-27 rue Moussorgski</div>
    </div>
  </div>
);
