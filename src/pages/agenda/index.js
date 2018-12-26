import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql, Link } from 'gatsby';
import ArtitstsList from '../../components/artitstsList';
import { sanitizeName } from '../../utils';

const computeAgendaByDate = flatDateList => {
  return flatDateList.reduce((acc, flatDate) => {
    const y = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
    }).format(new Date(flatDate.node.startDate));
    const m = new Intl.DateTimeFormat('fr-FR', {
      month: 'numeric',
    }).format(new Date(flatDate.node.startDate));

    if (!acc[y]) {
      acc[y] = {};
    }
    if (!acc[y][m]) {
      acc[y][m] = [];
    }

    acc[y][m].push(flatDate.node);
    return acc;
  }, {});
};

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];

export default props => (
  <>
    <Header activeTab={'agenda'} />
    <div styles={styles} className="agenda-page">
      <div className="bread-crumb">
        <Link to="/agenda">Agenda</Link>
      </div>
      <ArtitstsList />
      {Object.entries(
        computeAgendaByDate(props.data.allContentfulShowDate.edges),
      ).map(keyValuePair => (
        <>
          <h2>{keyValuePair[0]}</h2>
          {Object.entries(keyValuePair[1])
            .sort()
            .map(keyEntryPair => (
              <>
                <h3>{monthNames[keyEntryPair[0]]}</h3>
                <ul>
                  {keyEntryPair[1]
                    .sort((a, b) => {
                      return a.startDate < b.startDate ? -1 : 1;
                    })
                    .map(dateEntry => (
                      <li>
                        <div className="date">
                          <div>{dateEntry.startDate}</div>
                          <div className="separator">&#x2022;</div>
                          <div className="date">{dateEntry.endDate}</div>
                        </div>
                        <div className="bracket">
                          <Link
                            to={`artists/${sanitizeName(
                              dateEntry.show.artist.name,
                            )}`}
                          >
                            {dateEntry.show.artist.name}
                          </Link>
                        </div>
                        <div className="show-name">{dateEntry.show.name}</div>
                      </li>
                    ))}
                </ul>
              </>
            ))}
        </>
      ))}
    </div>
  </>
);

export const pageQuery = graphql`
  query {
    allContentfulShowDate {
      edges {
        node {
          startDate
          endDate
          show {
            name
            artist {
              id
              name
            }
          }
        }
      }
    }
  }
`;
