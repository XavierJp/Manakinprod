import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import ArtitstsList from '../../components/artitstsListForAgenda';
import DateListForAgenda from '../../components/dateListForAgenda';
import BreadCrumb from '../../uiComponents/breadCrumb';

export default props => (
  <Layout>
    <Header activeTab={'agenda'} />
    <div styles={styles} className="agenda-page">
      <BreadCrumb current="Agenda" />
      <ArtitstsList />
      <DateListForAgenda dates={props.data.allContentfulShowDate.edges} />
    </div>
  </Layout>
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
