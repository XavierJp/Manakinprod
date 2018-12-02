import React from 'react';
import styles from './styles.scss';
import LinkUnderlined from '../uiComponents/linkUnderlined';
import Header from '../components/header';
import { graphql } from 'gatsby';
import { sanitizeName } from '../utils';

export default (props) => 
  <div styles={styles} className="home">
    <Header/>
    <div className="summary">
      <p>
        MANAKIN est une <span className="bracket"> plateforme de
        production </span> co-fondée par <span className="bracket"> Lauren Boyer et Leslie Perrin </span> pour co-construire et développer
        des projets artistiques originaux
        avec
      </p>
      <div className="artists">
        {props.data.allContentfulArtists.edges.map((artist, index)=>
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
        )}
      </div>
  </div>
</div>

export const pageQuery = graphql`
  query artists
    {
      allContentfulArtists { edges {
        node {
          id
          name,
          website
        }
      } }
    }
`;
