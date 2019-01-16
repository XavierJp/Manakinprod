import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
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
    to: `/artists/${sanitizeName(artist)}/`,
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
      <link
        rel="canonical"
        href={`https://manakinprod.fr/${sanitizeName(
          props.data.contentfulShow.artist.name,
        )}/${props.data.contentfulShow.url}/`}
      />
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
          {props.data.contentfulShow.pIctures &&
            props.data.contentfulShow.pIctures.map(picture => (
              <>
                <img
                  src={picture.fixed.src}
                  alt={picture.title}
                  title={picture.title}
                />
                {/* {props.data.contentfulArtists.pictureCredit && (
                <p className="picture-credit">
                  Crédits photo : {props.data.contentfulArtists.pictureCredit}
                </p>
              )} */}
              </>
            ))}
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
          <div className="sub-section">
            <h2>Distribution</h2>
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
        </div>
        <div className="third-col">
          <div className="sub-section">
            <h2>Dates passées</h2>
            <div>En construction</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

export const pageQuery = graphql`
  query($showId: String!) {
    contentfulShow(id: { eq: $showId }) {
      id
      name
      url
      childContentfulShowDescriptionTextNode {
        description
        childMarkdownRemark {
          html
        }
      }
      pIctures {
        title
        fixed(width: 500) {
          width
          height
          src
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
