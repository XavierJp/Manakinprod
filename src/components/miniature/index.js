import React from 'react';
import styles from './styles.scss';
import Link from '../../uiComponents/link';
import logo_manakin from '../../resources/logo_centered_low_q.jpg';
import { StaticQuery, graphql } from 'gatsby';

export default () => (
  <StaticQuery
    query={graphql`
      query manakinInfos {
        allContentfulAboutManakin {
          edges {
            node {
              id
              name
              description
              address
            }
          }
        }
      }
    `}
    render={data => (
      <div styles={styles} className="logo">
        <Link to="/">
          <img alt="Logo de Manakin Production" src={logo_manakin} />
        </Link>
        <div>
          <p>
            <Link to="/">
              <b>{data.allContentfulAboutManakin.edges[0].node.name}</b>
            </Link>{' '}
            <span className="separator">&#x2022;</span>{' '}
            <span to="/more" className="bracket">
              <Link to="/more">{data.allContentfulAboutManakin.edges[0].node.description}</Link>
            </span>
            <br />
          </p>
          <div>{data.allContentfulAboutManakin.edges[0].node.address}</div>
        </div>
      </div>
    )}
  />
);

