import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import ArtitstsList from '../../components/artitstsListForAgenda';
import DateListForAgenda from '../../components/dateListForAgenda';
import BreadCrumb from '../../uiComponents/breadCrumb';

const breadCrumbPath = [
  {
    to: '/agenda',
    label: 'Agenda',
  },
];

export default props => (
  <Layout>
    <Header activeTab={'agenda'} />
    <div styles={styles} className="agenda-page">
      <BreadCrumb
        paths={breadCrumbPath}
        current={props.data.contentfulArtists.name}
      />
      <ArtitstsList active={props.data.contentfulArtists.name} />
      <DateListForAgenda
        dates={props.data.contentfulArtists.show.reduce((acc, show) => {
          if (!show.showdate) {
            return acc;
          }
          return [
            ...acc,
            ...show.showdate.map(showdate => {
              return {
                node: {
                  ...showdate,
                  show: {
                    name: show.name,
                    artist: { name: props.data.contentfulArtists.name },
                  },
                },
              };
            }),
          ];
        }, [])}
      />
    </div>
  </Layout>
);

export const agendaForArtist = graphql`
  query($artistId: String!) {
    contentfulArtists(id: { eq: $artistId }) {
      id
      name
      show {
        name
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
