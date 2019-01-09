import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import BreadCrumb from '../../uiComponents/breadCrumb';
import { graphql } from 'gatsby';

export default props => (
  <Layout>
    <Header />
    <div styles={styles} className="more-about-manakin">
      <BreadCrumb current="A propos de Manakin" />
      <div
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.about
              .childMarkdownRemark.html,
        }}
      />
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html:
              props.data.allContentfulAboutManakin.edges[0].node.bioLeslie
                .childMarkdownRemark.html,
          }}
        />
        <p
          dangerouslySetInnerHTML={{
            __html:
              props.data.allContentfulAboutManakin.edges[0].node.bioLauren
                .childMarkdownRemark.html,
          }}
        />
      </div>
      <img
        src={
          props.data.allContentfulAboutManakin.edges[0].node.picture.fixed.src
        }
        alt={props.data.allContentfulAboutManakin.edges[0].node.picture.title}
      />
      <p className="picture-legend">
        {props.data.allContentfulAboutManakin.edges[0].node.picLegend}
      </p>
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
          bioLeslie {
            childMarkdownRemark {
              html
            }
          }
          bioLauren {
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
