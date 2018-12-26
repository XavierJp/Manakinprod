import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql } from 'gatsby';

export default props => (
  <>
    <Header />
    <div styles={styles} className="more-about-manakin">
      <p
        dangerouslySetInnerHTML={{
          __html:
            props.data.allContentfulAboutManakin.edges[0].node.about
              .childMarkdownRemark.html,
        }}
      />
    </div>
  </>
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
        }
      }
    }
  }
`;
