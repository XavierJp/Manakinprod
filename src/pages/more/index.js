import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';

export default props => (
  <Layout>
    <Header />
    <div className="more-about-manakin">
      <h1 className="centered">A propos de MANAKIN</h1>
      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.about
              .childMarkdownRemark.html,
        }}
      />
      <div className="biographies">
        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html:
              props.data.allContentfulAboutManakin.edges[0].node.bios
                .childMarkdownRemark.html,
          }}
        />
      </div>
      <div className="picture">
        <img
          src={
            props.data.allContentfulAboutManakin.edges[0].node.picture.fixed.src
          }
          alt={props.data.allContentfulAboutManakin.edges[0].node.picture.title}
          title={
            props.data.allContentfulAboutManakin.edges[0].node.picture.title
          }
        />
        <p>{props.data.allContentfulAboutManakin.edges[0].node.picLegend}</p>
      </div>
    </div>
    <Footer />
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
          bios {
            childMarkdownRemark {
              html
            }
          }
          picture {
            title
            fixed(width: 500) {
              width
              height
              src
            }
          }
          picLegend
        }
      }
    }
  }
`;
