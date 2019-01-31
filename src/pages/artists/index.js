import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import Link from '../../uiComponents/link';
import { sanitizeName } from '../../utils';
import BreadCrumb from '../../uiComponents/breadCrumb';

export default props => (
  <Layout>
    <Header activeTab={'artists'} />
    <div styles={styles} className="artists-page">
      <BreadCrumb current="Artistes" />
      <div className="artists-list">
        {props.data.allContentfulArtists.edges.map(artist => (
          <Link
            style={{
              width: `${artist.node.image.fixed.width}px`,
              height: `${artist.node.image.fixed.height}px`,
            }}
            to={`/artists/${sanitizeName(artist.node.name)}/`}
          >
        <img
              src={artist.node.image.fixed.src}
              alt={artist.node.image.title}
              title={artist.node.image.title}
            />
            <div className="button">
              <p>{artist.node.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
  </Layout>
);

export const pageQuery = graphql`
  query artistsListForPage {
    allContentfulArtists(sort: {fields: order, order: ASC}) {
      edges {
        node {
          id
          name
          image {
            title
            fixed(height: 350, width: 560) {
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
