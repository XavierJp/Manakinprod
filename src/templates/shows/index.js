import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import BreadCrumb from '../../uiComponents/breadCrumb';
import { sanitizeName } from '../../utils';

const breadCrumbPath = artist => [
  {
    to: '/artists',
    label: 'Artistes',
  },
  {
    to: `/artists/${sanitizeName(artist)}`,
    label: artist,
  },
];

export default props => (
  <Layout>
    <Header activeTab={'artists'} />
    <div styles={styles} className="show-page">
      <BreadCrumb
        paths={breadCrumbPath(props.data.contentfulShow.artist.name)}
        current={props.data.contentfulShow.name}
      />
      <div className="show-container">
        <div className="first-col">
          <div
            className="show-description"
            dangerouslySetInnerHTML={{
              __html:
                props.data.contentfulShow.childContentfulShowDescriptionTextNode
                  .childMarkdownRemark.html,
            }}
          />
          <div
            className="show-distribution"
            dangerouslySetInnerHTML={{
              __html:
                props.data.contentfulShow
                  .childContentfulShowDistributionTextNode.childMarkdownRemark
                  .html,
            }}
          />
        </div>
        <div className="second-col" />
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query($showId: String!) {
    contentfulShow(id: { eq: $showId }) {
      id
      name
      childContentfulShowDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
      childContentfulShowDistributionTextNode {
        childMarkdownRemark {
          html
        }
      }
      artist {
        id
        name
      }
    }
  }
`;
