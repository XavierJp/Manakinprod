import React from 'react';
import { Helmet } from 'react-helmet';
import '../../resources/reset.scss';
import './global.scss';

const DefaultLayout = ({ children }) => (
  <div id="layout-global">
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="language" content="fr-FR" />
      <title>Manakin - Plateforme de production</title>
      <link rel="canonical" href="https://manakinprod.fr" />
      <meta
        name="description"
        content="MANAKIN est une plateforme de production qui co-construit et développe des projets artistiques originaux"
      />
      <meta
        name="google-site-verification"
        content="1s82ZT6xQazOFEVwn5iUg4KJEQW48-WPgioXI98u8-g"
      />
    </Helmet>
    {children}
  </div>
);
export default DefaultLayout;
