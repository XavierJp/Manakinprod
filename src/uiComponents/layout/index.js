import React from 'react';
import globalStyles from './global.scss';
import { Helmet } from 'react-helmet';
import 'typeface-fira-mono';
import 'typeface-courier-prime';

export default ({ children }) => (
  <div id="layout-global" style={globalStyles}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Manakin - Plateforme de production</title>
      <link rel="canonical" href="http://manakinprod.fr" />
      <meta
        name="description"
        content="MANAKIN est une plateforme de production co-fondée par Lauren Boyer et Leslie Perrin pour co-construire et développer des projets artistiques originaux"
      />
    </Helmet>
    {children}
  </div>
);
