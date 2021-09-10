import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';

const MentionsLegalesPage = (props) => (
  <Layout>
    <Header />
    <div className="mention-legales">
      <h1 className="centered">Mentions légales</h1>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.mentionsLegales
              .childMarkdownRemark.html,
        }}
      />
    </div>
    <Footer />
  </Layout>
);

export const pageQuery = graphql`
  query mentionsLegales {
    allContentfulAboutManakin {
      edges {
        node {
          id
          mentionsLegales {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;

export default MentionsLegalesPage;
