import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import BreadCrumb from '../../uiComponents/breadCrumb';
import { Helmet } from 'react-helmet';
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
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Manakin production | spectacle : {props.data.contentfulShow.name}
      </title>
      <meta
        name="description"
        content={`${props.data.contentfulShow.childContentfulShowDescriptionTextNode.description.slice(
          0,
          280,
        )}...`}
      />
    </Helmet>
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
        </div>
        <div className="second-col">
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
        description
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
