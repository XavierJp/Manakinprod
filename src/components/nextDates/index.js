import React from 'react';
import './styles.scss';
import { sanitizeName, formatShowDate } from '../../utils';
import Link from '../../uiComponents/link';

export default props => (
  <ul className="next-dates">
    {props.shows.length >= 1 ? (
      props.shows.map(showDate => (
        <li key={showDate.name + showDate.startDate}>
          <div className="separator">&#x2022;</div>
          <div>
            <div>
              <Link
                to={`artists/${sanitizeName(props.artistName)}/${
                  showDate.showUrl
                }/`}
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
                  <div className="date">{formatShowDate(showDate.endDate)}</div>
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
            {showDate.city && <div className="city">{showDate.city}</div>}
          </div>
        </li>
      ))
    ) : (
      <div className="italic">Aucune date n’est prévue pour ce spectacle</div>
    )}
  </ul>
);
