import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Layout from '../../components/layout';
import Link from '../../uiComponents/link';

const Page410 = () => (
  <Layout>
    <Header />
    <div className="error-410">
      <span role="img" aria-label="Sad-face" className="smiley-410">
        😭
      </span>
      <p>Oh non ! Il semblerait que cette page ait été supprimée...</p>
      <Link to="/" className="back button">
        <p>Retourner à la page d'accueil</p>
      </Link>
    </div>
  </Layout>
);
export default Page410;
