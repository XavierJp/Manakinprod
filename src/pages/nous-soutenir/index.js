import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';

export default props => (
  <Layout>
    <Header />
    <div styles={styles} className="mention-legales">
      <h1 className="centered">Nous soutenir</h1>
      <p>Page en cours de construction</p>
    </div>
    <Footer />
  </Layout>
);
