import React from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../components/layout';
import { graphql, Link } from 'gatsby';
import ArtitstsList from '../../components/artitstsListForAgenda';
import DateListForAgenda from '../../components/dateListForAgenda';
import BreadCrumb from '../../uiComponents/breadCrumb';

const breadCrumbPath = [
  {
    to: '/agenda',
    label: 'Agenda',
  },
];

const AgendaTemplate = (props) => (
  <Layout>
    <Header activeTab={'agenda'} />
    <div className="agenda-page">
      <BreadCrumb
        paths={breadCrumbPath}
        current={props.data.contentfulArtists.name}
      />
      <p className="explanation">
        Cliquez sur un des artistes ci-dessous pour afficher uniquement ses
        dates
      </p>
      <ArtitstsList active={props.data.contentfulArtists.name} />
      <p className="explanation">
        Pour consultez les dates passées, accédez aux{' '}
        <Link to="/archives">
          <b>☞ Archives</b>
        </Link>
      </p>
      <DateListForAgenda
        dates={props.data.contentfulArtists.show.reduce((acc, show) => {
          if (!show.showdate) {
            return acc;
          }
          return [
            ...acc,
            ...show.showdate.map((showdate) => {
              return {
                node: {
                  ...showdate,
                  show: {
                    name: show.name,
                    creationYear: show.creationYear,
                    url: show.url,
                    artist: { name: props.data.contentfulArtists.name },
                  },
                },
              };
            }),
          ];
        }, [])}
      />
    </div>
    <Footer />
  </Layout>
);

export const agendaForArtist = graphql`
  query ($artistId: String!) {
    contentfulArtists(id: { eq: $artistId }) {
      id
      name
      show {
        name
        url
        creationYear
        showdate {
          startDate
          endDate
          theatre
          city
          url
        }
      }
    }
  }
`;

export default AgendaTemplate;
