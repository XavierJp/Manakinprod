import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styles from './styles.scss';
import { sanitizeName } from '../../utils';

export default props => (
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
      <div styles={styles} className="artist-list-for-agenda">
        {data.allContentfulArtists.edges.map(artist => (
          <Link
            to={`agenda/${sanitizeName(artist.node.name)}`}
            key={artist.node.name}
            className={props.active === artist.node.name && 'active'}
          >
            <p>{artist.node.name}</p>
          </Link>
        ))}
      </div>
    )}
  />
);
