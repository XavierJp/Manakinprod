import React from 'react';
import styles from './styles.scss';
import Link from '../../uiComponents/link';
import { sanitizeName, formatShowDate } from '../../utils';

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
  <div className="date-list-for-agenda" styles={styles}>
    {Object.entries(computeAgendaByDate(props.dates)).map(keyValuePair => (
      <>
        <h2>{keyValuePair[0]}</h2>
        {Object.entries(keyValuePair[1])
          .sort()
          .map(keyEntryPair => (
            <>
              <h3>{monthNames[keyEntryPair[0] - 1]}</h3>
              <ul>
                {keyEntryPair[1]
                  .sort((a, b) => {
                    return a.startDate < b.startDate ? -1 : 1;
                  })
                  .map(dateEntry => (
                    <li key={dateEntry.startDate}>
                      <div className="show-name bracket">                 <Link
                          to={`/artists/${sanitizeName(
                            dateEntry.show.artist.name,
                          )}/`}
                        >{dateEntry.show.name}</Link></div>
                      <div className="show-artist">
                        <Link
                          to={`/artists/${sanitizeName(
                            dateEntry.show.artist.name,
                          )}/`}
                        >
                          {dateEntry.show.artist.name}
                        </Link>
                      </div>
                      <div className="date">
                        <div>{formatShowDate(dateEntry.startDate)}</div>
                        {dateEntry.endDate !== dateEntry.startDate && (
                          <>
                            <div className="separator">&#x2022;</div>
                            <div className="date">
                              {formatShowDate(dateEntry.endDate)}
                            </div>
                          </>
                        )}
                      </div>
                      {dateEntry.url && dateEntry.theatre && (
                        <a
                          className="theatre"
                          href={dateEntry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="hand-separator">&#x261e;</span>
                          {dateEntry.theatre}
                        </a>
                      )}
                      {!dateEntry.url && dateEntry.theatre && (
                        <div className="theatre">{dateEntry.theatre}</div>
                      )}
                      {dateEntry.city && (
                        <div className="city">{dateEntry.city}</div>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          ))}
      </>
    ))}
  </div>
);
