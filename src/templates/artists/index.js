import React from 'react';
import styles from './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import Link from '../../uiComponents/link';
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
        Manakin production | artiste : {props.data.contentfulArtists.name}
      </title>
      <link
        rel="canonical"
        href={`https://manakinprod.fr/artists/${sanitizeName(
          props.data.contentfulArtists.name,
        )}/`}
      />
      <meta
        name="description"
        content={`${props.data.contentfulArtists.childContentfulArtistsDescriptionTextNode.description.slice(
          0,
          280,
        )}...`}
      />
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
            title={props.data.contentfulArtists.image.title}
          />
          {props.data.contentfulArtists.pictureCredit && (
            <p className="picture-credit">
              Crédits photo : {props.data.contentfulArtists.pictureCredit}
            </p>
          )}
          {props.data.contentfulArtists.show && (
            <div className="sub-section">
              <h2>Spectacles</h2>
              <ul>
                {props.data.contentfulArtists.show.sort((a, b) => (a.order < b.order ? -1 : 1)).map(show => (
                  <li key="show">
                    <div className="separator">&#x2022;</div>
                    <div key={show.name}>
                      <div>
                        <span className="bracket">{show.name}</span>
                        {show.creationYear && (
                          <span className="creation-year">
                            Creation {show.creationYear}
                          </span>
                        )}
                      </div>
                      <Link
                        className="more button"
                        to={`artists/${sanitizeName(
                          props.data.contentfulArtists.name,
                        )}/${show.url}/`}
                      >
                        <p>En savoir plus</p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {props.data.contentfulArtists.show && (
          <div className="third-col">
            <div className="sub-section">
              <h2>Prochaines dates</h2>
              <ul>
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
                          showUrl: show.url,
                          creationYear: show.creationYear,
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
                        <div>
                          <Link
                            to={`artists/${sanitizeName(
                              props.data.contentfulArtists.name,
                            )}/${showDate.showUrl}/`}
                            className="show-name bracket"
                          >
                            {showDate.name}
                          </Link>
                        </div>
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
              </ul>
            </div>
            <div className="artist-links">
              <h2>Liens utiles</h2>
              <div>
                <Link
                  to={`/agenda/${sanitizeName(
                    props.data.contentfulArtists.name,
                  )}/`}
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
                    l’artiste
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
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
        description
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
        order
        name
        creationYear
        url
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
