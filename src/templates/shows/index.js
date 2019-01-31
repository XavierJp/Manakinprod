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
        href={`https://manakinprod.fr/artists/${sanitizeName(
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
          <div className="picture-container">
          {props.data.contentfulShow.pIctures &&
            props.data.contentfulShow.pIctures.map((picture, index) => (
              <img
                src={picture.fixed.src}
                className={index === 0 ? 'active' : ''}
                alt={picture.title}
                title={picture.title}
                id
              />
            ))}
            {props.data.contentfulShow.pIctures &&
            props.data.contentfulShow.pIctures.length > 1 && (
              <div className="picture-carroussel">
                {props.data.contentfulShow.pIctures.map((el, index) => (
                  <span className={index === 0 ? 'active' : ''}>{index + 1}</span>
                ))}
              </div>
            )}
            {props.data.contentfulShow.creditsPictures && (
              <p className="picture-credit">
                Crédits photo : {props.data.contentfulShow.creditsPictures}
              </p>
            )}
          </div>
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
          {(props.data.contentfulShow.artisticFile || props.data.contentfulShow.pressFile || props.data.contentfulShow.technicalFile) && (
            <div className="show-links">
              <h2>Liens utiles</h2>
              {props.data.contentfulShow.artisticFile && (
                <div>
                  <a
                    href={props.data.contentfulShow.artisticFile.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt={props.data.contentfulShow.artisticFile.description}
                  >
                    <span className="hand-separator">&#x261e;</span> Dossier artistique
                  </a>
                </div>
              )}
              {props.data.contentfulShow.technicalFile && (
                <div>
                  <a
                    href={props.data.contentfulShow.technicalFile.file.url}
                    alt={props.data.contentfulShow.technicalFile.description}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hand-separator">&#x261e;</span> Fiche technique
                  </a>
                </div>
              )}
              {/* {props.data.contentfulShow.pressFile && (
                <div>
                  <a
                    href={props.data.contentfulShow.pressFile.file.url}
                    alt={props.data.contentfulShow.pressFile.description}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hand-separator">&#x261e;</span> Dossier de presse
                  </a>
                </div>
              )} */}
            </div>
          )}
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
      creditsPictures
      artisticFile {
        title
        description
        file {
          url
        }
      }
      technicalFile {
        title
        description
        file {
          url
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
