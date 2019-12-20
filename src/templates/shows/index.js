import React, { useState } from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import BreadCrumb from '../../uiComponents/breadCrumb';
import { Helmet } from 'react-helmet';
import { sanitizeName } from '../../utils';
import NextDates from '../../components/nextDates';

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

const Show = props => {
  const [selectedPic, setSelectedPic] = useState(0);

  return (
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
      <div className="show-page">
        <BreadCrumb
          paths={breadCrumbPath(props.data.contentfulShow.artist.name)}
          current={props.data.contentfulShow.name}
        />
        <div className="show-container">
          <div className="first-col">
            <div className="picture-container">
              {props.data.contentfulShow.pIctures && (
                <>
                  {props.data.contentfulShow.pIctures.map((picture, index) => (
                    <img
                      key={picture.fixed.src}
                      src={picture.fixed.src}
                      className={index === selectedPic ? 'active' : ''}
                      alt={picture.title}
                      title={picture.title}
                    />
                  ))}
                  {props.data.contentfulShow.pIctures.length > 1 && (
                    <div className="picture-carroussel">
                      {props.data.contentfulShow.pIctures.map((el, index) => (
                        <span
                          onClick={() => setSelectedPic(index)}
                          key={el.fixed.src}
                          className={index === selectedPic ? 'active' : ''}
                        >
                          {index + 1}
                        </span>
                      ))}
                    </div>
                  )}
                  {props.data.contentfulShow.creditsPictures && (
                    <p className="picture-credit">
                      Crédits photo :{' '}
                      {props.data.contentfulShow.creditsPictures}
                    </p>
                  )}
                </>
              )}
            </div>
            <div
              className="show-description markdown"
              dangerouslySetInnerHTML={{
                __html:
                  props.data.contentfulShow
                    .childContentfulShowDescriptionTextNode.childMarkdownRemark
                    .html,
              }}
            />
          </div>
          <div className="second-col">
            <div className="sub-section">
              <h2>Distribution</h2>
              <div
                className="show-distribution markdown"
                dangerouslySetInnerHTML={{
                  __html:
                    props.data.contentfulShow
                      .childContentfulShowDistributionTextNode
                      .childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
          <div className="third-col">
            <div className="sub-section">
              <h2>Dates à venir</h2>
              <NextDates
                shows={
                  props.data.contentfulShow.showdate
                    ? props.data.contentfulShow.showdate
                        .map(showDate => {
                          return {
                            ...showDate,
                            name: props.data.contentfulShow.name,
                            showUrl: props.data.contentfulShow.url,
                            creationYear:
                              props.data.contentfulShow.creationYear,
                          };
                        })
                        .filter(d => new Date(d.startDate) > new Date())
                        .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))
                        .slice(0, 6)
                    : []
                }
                artistName={props.data.contentfulShow.artist.name}
              />
            </div>
            {(props.data.contentfulShow.artisticFile ||
              props.data.contentfulShow.pressFile ||
              props.data.contentfulShow.technicalFile) && (
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
                      <span className="hand-separator">&#x261e;</span> Dossier
                      artistique
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
                      <span className="hand-separator">&#x261e;</span> Fiche
                      technique
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
};

export default Show;

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
      showdate {
        startDate
        endDate
        theatre
        city
        url
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
