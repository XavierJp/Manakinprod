import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql, Link } from 'gatsby';
import ArtitstsList from '../../components/artitstsList';
import { sanitizeName } from '../../utils';

export default props => (
  <>
    <Header activeTab={'agenda'} />
    <div styles={styles} className="agenda-page">
      <div className="bread-crumb">
        <Link to="/artists">Agenda</Link>
        {/* <span className="hand-separator">&#x261e;</span> */}
      </div>
      <ArtitstsList />
      <ul>
        {props.data.allContentfulShowDate.edges.map(showDate => (
          <li>
            <div className="date">
              <div>{showDate.node.startDate}</div>
              <div className="separator">&#x2022;</div>
              <div className="date">{showDate.node.endDate}</div>
            </div>
            <div className="bracket">
              <Link
                to={`artists/${sanitizeName(showDate.node.show.artist.name)}`}
              >
                {showDate.node.show.artist.name}
              </Link>
            </div>
            <div className="show-name">{showDate.node.show.name}</div>
          </li>
        ))}
      </ul>
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
