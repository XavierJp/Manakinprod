import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import Layout from '../../uiComponents/layout';
import { graphql, Link } from 'gatsby';
import { sanitizeName, formatShowDate } from '../../utils';
import BreadCrumb from '../../uiComponents/breadCrumb';
import { Helmet } from 'react-helmet';

const breadCrumbPath = [
  {
    to: '/artists',
    label: 'Artistes',
  },
];

export default props => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Manakin production | page artiste : {props.data.contentfulArtists.name}
      </title>
    </Helmet>
    <Header activeTab={'artists'} />
    <div styles={styles} className="artist-page">
      <BreadCrumb
        paths={breadCrumbPath}
        current={props.data.contentfulArtists.name}
      />
      <div className="artist-container">
        <div className="first-col">
          <div
            className="artist-description"
            dangerouslySetInnerHTML={{
              __html:
                props.data.contentfulArtists
                  .childContentfulArtistsDescriptionTextNode.childMarkdownRemark
                  .html,
            }}
          />
        </div>
        <div className="second-col">
          <img
            src={props.data.contentfulArtists.image.fixed.src}
            alt={props.data.contentfulArtists.image.title}
          />
          {props.data.contentfulArtists.pictureCredit && (
            <p className="picture-credit">
              Crédits photo : {props.data.contentfulArtists.pictureCredit}
            </p>
          )}
          {props.data.contentfulArtists.show && (
            <div className="sub-section">
              <h2>Spectacles</h2>
              {props.data.contentfulArtists.show.map(show => (
                <li key="show">
                  <div className="separator">&#x2022;</div>
                  <div key={show.name}>
                    <div>{show.name}</div>
                    <Link
                      className="more button"
                      to={`artists/${sanitizeName(
                        props.data.contentfulArtists.name,
                      )}/${sanitizeName(show.name)}/`}
                    >
                      <p>En savoir plus</p>
                    </Link>
                  </div>
                </li>
              ))}
            </div>
          )}
        </div>
        {props.data.contentfulArtists.show && (
          <div className="third-col">
            <div className="sub-section">
              <h2>Prochaines dates</h2>
              {props.data.contentfulArtists.show
                .reduce((acc, show) => {
                  if (!show.showdate) {
                    return acc;
                  }
                  return [
                    ...acc,
                    ...show.showdate.map(s => {
                      return {
                        ...s,
                        name: show.name,
                      };
                    }),
                  ];
                }, [])
                .sort((a, b) => (a.startDate < b.startDate ? -1 : 1))
                .slice(0, 4)
                .map(showDate => (
                  <li key={showDate.name + showDate.startDate}>
                    <div className="separator">&#x2022;</div>
                    <div>
                      <div className="show-name">{showDate.name}</div>
                      <div className="date">
                        <div>{formatShowDate(showDate.startDate)}</div>
                        {showDate.endDate !== showDate.startDate && (
                          <>
                            <div className="separator">&#x2022;</div>
                            <div className="date">
                              {formatShowDate(showDate.endDate)}
                            </div>
                          </>
                        )}
                      </div>
                      {showDate.url && showDate.theatre && (
                        <a
                          className="theatre"
                          href={showDate.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="hand-separator">&#x261e;</span>
                          {showDate.theatre}
                        </a>
                      )}
                      {!showDate.url && showDate.theatre && (
                        <div className="theatre">{showDate.theatre}</div>
                      )}
                      {showDate.city && (
                        <div className="city">{showDate.city}</div>
                      )}
                    </div>
                  </li>
                ))}
            </div>
            <div className="artist-links">
              <h2>Liens utiles</h2>
              <div>
                <Link
                  to={`/agenda/${sanitizeName(
                    props.data.contentfulArtists.name,
                  )}`}
                >
                  <span className="hand-separator">&#x261e;</span> Agenda
                </Link>
              </div>
              {props.data.contentfulArtists.website && (
                <div>
                  <a
                    href={props.data.contentfulArtists.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="hand-separator">&#x261e;</span> Site de
                    l‘artiste
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query($artistId: String!) {
    contentfulArtists(id: { eq: $artistId }) {
      id
      name
      website
      pictureCredit
      childContentfulArtistsDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
      image {
        title
        fixed(width: 500) {
          width
          height
          src
        }
      }
      show {
        name
        showdate {
          startDate
          endDate
          theatre
          city
          url
        }
      }
    }
  }
`;
