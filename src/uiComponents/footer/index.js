import React from 'react';
import Link from '../link';
import './styles.scss';

const Footer = () => (
  <div className="footer">
    <div>
      <span>© 2018 Manakin production</span>
      <span className="separator">&#x2022;</span>
      <Link to="/mentions-legales">Mentions légales</Link>
      <span className="separator">&#x2022;</span>
      <Link to="/nous-soutenir">Nous soutenir</Link>
    </div>
    {/* <Newsletter /> */}
    <div>
      <a href="https://manakinprod.us18.list-manage.com/subscribe/post?u=585d05eb73fc94d89734f03a6&amp;id=9a38620960">
        <span>&#x261e;</span> S'inscrire à la newsletter
      </a>
    </div>
  </div>
);
export default Footer;
