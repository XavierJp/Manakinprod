import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../components/layout';
import { graphql, Link } from 'gatsby';
import ArtitstsList from '../../components/artitstsListForAgenda';
import DateListForAgenda from '../../components/dateListForAgenda';
import BreadCrumb from '../../uiComponents/breadCrumb';

const AgendaPage = (props) => (
  <Layout>
    <Header activeTab={'agenda'} />
    <div className="agenda-page">
      <BreadCrumb current="Agenda" />
      <p className="explanation">
        Cliquez sur un des artistes ci-dessous pour afficher ses dates à venir.{' '}
      </p>
      <ArtitstsList />
      <p className="explanation">
        Pour consultez les dates passées, accédez aux{' '}
        <Link to="/archives">
          <b>☞ Archives</b>
        </Link>
      </p>
      <DateListForAgenda dates={props.data.allContentfulShowDate.edges} />
    </div>
    <Footer />
  </Layout>
);

export const pageQuery = graphql`
  query {
    allContentfulShowDate(sort: { fields: startDate, order: ASC }) {
      edges {
        node {
          startDate
          endDate
          city
          theatre
          url
          show {
            name
            creationYear
            url
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

export default AgendaPage;
