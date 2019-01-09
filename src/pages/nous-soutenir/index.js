import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Layout from '../../uiComponents/layout';
import BreadCrumb from '../../uiComponents/breadCrumb';

export default props => (
  <Layout>
    <Header />
    <div styles={styles} className="mention-legales">
      <BreadCrumb current="Nous soutenir" />
      <p>Page en cours de construction</p>
    </div>
  </Layout>
);
