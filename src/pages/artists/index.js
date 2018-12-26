import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql, Link } from 'gatsby';
import { sanitizeName } from '../../utils';

export default props => (
  <>
    <Header activeTab={'artists'} />
    <div styles={styles} className="artists-page">
      <div className="bread-crumb">
        <Link to="/artists">Artistes</Link>
        {/* <span className="hand-separator">&#x261e;</span> */}
      </div>
      <div className="artists-list">
        {props.data.allContentfulArtists.edges.map(artist => (
          <Link
            style={{
              width: `${artist.node.image.fixed.width}px`,
              height: `${artist.node.image.fixed.height}px`,
              backgroundColor: '#eee',
            }}
            to={`/artists/${sanitizeName(artist.node.name)}`}
          >
            <img
              src={artist.node.image.fixed.src}
              alt={artist.node.image.title}
            />
            <div className="button">
              <p>{artist.node.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
);

export const pageQuery = graphql`
  query artistsListForPage {
    allContentfulArtists {
      edges {
        node {
          id
          name
          image {
            title
            fixed(height: 300) {
              width
              height
              src
            }
          }
        }
      }
    }
  }
`;
