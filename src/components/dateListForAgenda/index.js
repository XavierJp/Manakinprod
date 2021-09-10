import React, { Fragment } from 'react';
import './styles.scss';
import Link from '../../uiComponents/link';
import { sanitizeName, formatShowDate } from '../../utils';

const computeAgendaByDate = (flatDateList) => {
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

const DateListForAgenda = (props) => (
  <div className="date-list-for-agenda">
    {props.dates.length >= 1 ? (
      Object.entries(computeAgendaByDate(props.dates))
        // most recent year first
        .sort((y1, y2) => y2[0] - y1[0])
        .map((byYearKvp) => (
          <Fragment key={byYearKvp[0]}>
            <h2>{byYearKvp[0]}</h2>
            {Object.entries(byYearKvp[1]).map((byMonthKvp) => (
              <Fragment key={byMonthKvp[0]}>
                <h3>{monthNames[byMonthKvp[0] - 1]}</h3>
                <ul>
                  {byMonthKvp[1]
                    .sort((a, b) => {
                      return a.startDate < b.startDate ? -1 : 1;
                    })
                    .map((dateEntry) => (
                      <li key={dateEntry.startDate}>
                        <div>
                          <span className="show-name bracket">
                            <Link
                              to={`/artists/${sanitizeName(
                                dateEntry.show.artist.name,
                              )}/${dateEntry.show.url}/`}
                            >
                              {dateEntry.show.name}
                            </Link>
                          </span>
                          {dateEntry.show.creationYear && (
                            <span className="creation-year">
                              Creation {dateEntry.show.creationYear}
                            </span>
                          )}
                        </div>
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
              </Fragment>
            ))}
          </Fragment>
        ))
    ) : (
      <div className="italic small">
        Nous n’avons malheureusement aucune date pour cet artiste.
      </div>
    )}
  </div>
);

export default DateListForAgenda;
