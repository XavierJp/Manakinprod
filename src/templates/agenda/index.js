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
        <span className="hand-separator">&#x261e;</span>
        <Link to="/">{props.data.contentfulArtists.name}</Link>
      </div>
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
  </>
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
