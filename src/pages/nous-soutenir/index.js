import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';

export default props => (
  <Layout>
    <Header />
    <div className="support-us">
      <h1 className="centered">Nous soutenir</h1>
      <div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html:
              props.data.allContentfulAboutManakin.edges[0].node.supportUs
                .childMarkdownRemark.html,
          }}
        />
      </div>
    </div>
    <Footer />
  </Layout>
);

export const pageQuery = graphql`
  query supportUs {
    allContentfulAboutManakin {
      edges {
        node {
          id
          supportUs {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
