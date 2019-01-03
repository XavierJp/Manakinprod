import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './styles.scss';

const instaIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

const facebookIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default () => (
  <StaticQuery
    query={graphql`
      query socialNetworks {
        allContentfulAboutManakin {
          edges {
            node {
              id
              facebook
              instagram
            }
          }
        }
      }
    `}
    render={data => (
      <div styles={styles} className="social-networks">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.allContentfulAboutManakin.edges[0].node.facebook}
        >
          {facebookIcon}
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={data.allContentfulAboutManakin.edges[0].node.instagram}
        >
          {instaIcon}
        </a>
      </div>
    )}
  />
);
