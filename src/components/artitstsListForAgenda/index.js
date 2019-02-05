import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from '../../uiComponents/link';
import './styles.scss';
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
      <div className="artist-list-for-agenda">
        {data.allContentfulArtists.edges.map(artist => (
          <Link
            to={`agenda/${
              props.active === artist.node.name
                ? ''
                : sanitizeName(artist.node.name)
            }/`}
            key={artist.node.name}
            className={props.active === artist.node.name ? 'active' : ''}
          >
            <p>{artist.node.name}</p>
          </Link>
        ))}
      </div>
    )}
  />
);
