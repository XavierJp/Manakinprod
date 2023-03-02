import React from 'react';
import './styles.scss';
import Link from '../../uiComponents/link';
import { sanitizeName } from '../../utils';
import { extractYear, extractMonth, monthNames } from '../dateListForAgenda';

const DateListForArchives = (props) => (
  <div className="date-list-for-archives">
    {props.dates.length >= 1 ? (
      props.dates.map(({ node }, index) => (
        <div key={`date-list-${index}`} className="line">
          <span>
            {extractYear(node.startDate)}
            <span className="separator">&#x2022;</span>
            {monthNames[extractMonth(node.startDate) - 1] || <i>?</i>}
            <span className="separator">&#x2022;</span>
          </span>
          <div className="artist-and-show">
            <Link
              to={`/artists/${sanitizeName(node.show.artist.name)}/${
                node.show.url
              }/`}
            >
              {node.show.name}
            </Link>
            <i> par </i>
            <Link to={`/artists/${sanitizeName(node.show.artist.name)}/`}>
              {node.show.artist.name}
            </Link>
          </div>
          <div className="place">
            <span className="separator">&#x261e;</span>
            <div>
              <div>
                {node.theatre &&
                  (node.url ? (
                    <a
                      className="theatre"
                      href={node.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {node.theatre}
                    </a>
                  ) : (
                    <span className="theatre">{node.theatre}</span>
                  ))}
              </div>
              {node.city && <div className="city">à {node.city}</div>}
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="italic small">Il n’y a ucune date pour ces critères.</div>
    )}
  </div>
);

export default DateListForArchives;
