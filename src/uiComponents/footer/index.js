import React from 'react';
import Link from '../link';
import styles from './styles.scss';

export default props => (
  <footer styles={styles}>
    <div>
      <span>© 2018 Manakin production</span>
      <span className="separator">&#x2022;</span>
      <Link to="/mentions-legales">Mentions légales</Link>
      <span className="separator">&#x2022;</span>
      <Link to="/nous-soutenir">Nous soutenir</Link>
    </div>
    <div>
      <span>&#x261e;</span> S'inscrire à la newsletter
    </div>
  </footer>
);
