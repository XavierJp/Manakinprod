import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql, Link } from 'gatsby';

export default props => (
  <>
    <Header activeTab={'artists'} />
    <div styles={styles} className="artist-page">
      <div className="bread-crumb">
        <Link to="/artists">Artistes</Link>
        <span className="hand-separator">&#x261e;</span>
        <Link to="/">{props.data.contentfulArtists.name}</Link>
      </div>
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
                    <Link className="more button" to="/">
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
                  if (!show.showDate) {
                    return acc;
                  }
                  return [
                    ...acc,
                    ...show.showdate.map(s => {
                      return {
                        startDate: s.startDate,
                        endDate: s.endDate,
                        name: show.name,
                      };
                    }),
                  ];
                }, [])
                .sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
                .map(showDate => (
                  <li key={showDate.name + showDate.startDate}>
                    <div className="separator">&#x2022;</div>
                    <div>
                      <span>
                        {`${new Intl.DateTimeFormat('fr-FR', {
                          day: 'numeric',
                          month: '2-digit',
                        }).format(new Date(showDate.startDate))}
                        au
                        ${new Intl.DateTimeFormat('fr-FR', {
                          day: 'numeric',
                          month: '2-digit',
                        }).format(
                          new Date(showDate.endDate),
                        )} ${new Intl.DateTimeFormat('fr-FR', {
                          year: 'numeric',
                        }).format(new Date(showDate.endDate))}`}
                      </span>
                      <div className="show-name">{showDate.name}</div>
                      <Link className="more button" to="/">
                        <p>En savoir plus</p>
                      </Link>
                    </div>
                  </li>
                ))}
            </div>
            <div className="artist-links">
              <h3>Liens utiles</h3>
              <div>
                <Link to="/agenda">
                  <span className="hand-separator">&#x261e;</span> Agenda
                </Link>
              </div>
              {props.data.contentfulArtists.website && (
                <div>
                  <a href={props.data.contentfulArtists.website}>
                    <span className="hand-separator">&#x261e;</span> Site de
                    l‘artiste
                  </a>
                </div>
              )}
              <div>
                <Link>
                  <span className="hand-separator">&#x261e;</span> Dossier de
                  presse
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
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
        }
      }
    }
  }
`;
