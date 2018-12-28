import React from 'react';
import styles from './styles.scss';
import LinkUnderlined from '../uiComponents/linkUnderlined';
import Header from '../components/header';
import SocialNetworks from '../components/socialNetworks';
import { graphql, Link } from 'gatsby';
import { sanitizeName } from '../utils';

export default props => (
  <div styles={styles} className="home">
    <Header />
    <div className="summary">
      <h1>
        MANAKIN est une{' '}
        <span className="bracket">
          {' '}
          <Link to="more">plateforme de production</Link>{' '}
        </span>{' '}
        co-fondée par{' '}
        <span className="bracket">
          {' '}
          <Link to="more"> Lauren Boyer et Leslie Perrin</Link>{' '}
        </span>{' '}
        pour co-construire et développer des projets artistiques originaux avec
      </h1>
      <div className="artists">
        {props.data.allContentfulArtists.edges.map((artist, index) => (
          <div key={index}>
            <LinkUnderlined
              className="artist-name"
              label={artist.node.name}
              targetPath={`artists/${sanitizeName(artist.node.name, artist)}`}
            />
            {index < props.data.allContentfulArtists.edges.length - 1 && (
              <div className="separator">&#x2022;</div>
            )}
          </div>
        ))}
      </div>
      <div className="contact">
        <div>
          <div>Lauren Boyer</div>
          <div>lauren@manakinprod.fr</div>
        </div>
        <div>
          <div>Leslie Perrin</div>
          <div>leslie@manakinprod.fr</div>
        </div>
      </div>
      <SocialNetworks />
      <div />
    </div>
    <div className="footer">
      <span>© 2018 Manakin production</span>
      <span className="separator">&#x2022;</span>
      <Link to="mentions-legales">Mentions légales</Link>
    </div>
  </div>
);

export const pageQuery = graphql`
  query artists {
    allContentfulArtists {
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
