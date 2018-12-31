import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';

export default props => (
  <Layout>
    <Header />
    <div styles={styles} className="more-about-manakin">
      <div
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.about
              .childMarkdownRemark.html,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.biographies
              .childMarkdownRemark.html,
        }}
      />
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query aboutUs {
    allContentfulAboutManakin {
      edges {
        node {
          id
          about {
            childMarkdownRemark {
              html
            }
          }
          biographies {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
