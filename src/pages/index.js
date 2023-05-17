import React from 'react';
import './styles.scss';
import LinkUnderlined from '../uiComponents/linkUnderlined';
import Header from '../uiComponents/header';
import Footer from '../uiComponents/footer';
import Layout from '../components/layout';
import SocialNetworks from '../components/socialNetworks';
import { graphql } from 'gatsby';
import Link from '../uiComponents/link';
import { sanitizeName } from '../utils';

const IndexPage = (props) => (
  <Layout>
    <Header />
    <div className="home">
      <div className="summary">
        <h1>
          MANAKIN est une{' '}
          <span className="bracket">
            <Link to="/more">plateforme de production</Link>
          </span>{' '}
          qui co-construit et développe des projets artistiques originaux avec
        </h1>
        <div className="artists">
          {props.data.allContentfulArtists.edges.map((artist, index) => (
            <div key={index}>
              <LinkUnderlined
                className="artist-name"
                label={artist.node.name}
                targetPath={`/artists/${sanitizeName(
                  artist.node.name,
                  artist,
                )}/`}
              />
              {index < props.data.allContentfulArtists.edges.length - 1 && (
                <div className="separator">&#x2022;</div>
              )}
            </div>
          ))}
        </div>
        <div className="contact">
          <div>
            <div>Leslie Perrin</div>
            <a href="mailto:leslie@manakinprod.fr">leslie@manakinprod.fr</a>
          </div>
          <div>
            <div>Adèle Tourte</div>
            <a href="mailto:adele@manakinprod.fr">adele@manakinprod.fr</a>
          </div>
          <div>
            <div>Margot Guillerm</div>
            <a href="mailto:margot@manakinprod.fr">margot@manakinprod.fr</a>
          </div>
        </div>
        <SocialNetworks />
        <div />
      </div>
      <Footer />
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query artists {
    allContentfulArtists(sort: { fields: order, order: ASC }) {
      edges {
        node {
          id
          name
          website
        }
      }
    }
  }
`;
export default IndexPage;
