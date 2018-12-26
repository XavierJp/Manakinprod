import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './styles.scss';

export default () => (
  <StaticQuery
    query={graphql`
      query artistsList {
        allContentfulArtists {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `}
    render={data => (
      <div styles={styles} className="artist-list">
        {data.allContentfulArtists.edges.map(artist => (
          <div key={artist.node.name}>
            <p>{artist.node.name}</p>
          </div>
        ))}
      </div>
    )}
  />
);
