import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import { graphql, Link } from 'gatsby';
import ArtitstsList from '../../components/artitstsListForAgenda';
import DateListForAgenda from '../../components/dateListForAgenda';

export default props => (
  <>
    <Header activeTab={'agenda'} />
    <div styles={styles} className="agenda-page">
      <div className="bread-crumb">
        <Link to="/agenda">Agenda</Link>
      </div>
      <ArtitstsList />
      <DateListForAgenda dates={props.data.allContentfulShowDate.edges} />
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
          city
          theatre
          url
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
