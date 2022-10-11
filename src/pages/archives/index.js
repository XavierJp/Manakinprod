import React, { useEffect, useState } from 'react';
import './styles.scss';
import Header from '../../uiComponents/header';
import Footer from '../../uiComponents/footer';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';
import BreadCrumb from '../../uiComponents/breadCrumb';
import DateListForArchives from '../../components/dateListForArchives';
import Select from '../../uiComponents/select';
import { extractYear } from '../../components/dateListForAgenda';

const ArchivePage = (props) => {
  const initialData = props.data.allContentfulShowDate.edges.filter((edge) => {
    const start = new Date(edge.node.startDate);
    return start < new Date();
  });
  const years = Object.keys(
    initialData.reduce((acc, d) => {
      acc[extractYear(d.node.startDate)] = '';
      return acc;
    }, {}),
  );
  const artists = Object.keys(
    initialData.reduce((acc, d) => {
      acc[d.node.show.artist.name] = '';
      return acc;
    }, {}),
  );

  const [artist, selectArtist] = useState(null);
  const [year, selectYear] = useState(null);
  const [dates, setDates] = useState(initialData);

  useEffect(() => {
    const selectedDates = initialData.filter(({ node }) => {
      if (artist && node.show.artist.name !== artist) {
        return false;
      }
      if (year && extractYear(node.startDate) !== year) {
        return false;
      }
      return true;
    });
    setDates(selectedDates);
    return () => {};
  }, [year, artist, initialData]);

  return (
    <Layout>
      <Header activeTab={'agenda'} />
      <div className="archive-page">
        <BreadCrumb
          paths={[{ to: '/agenda', label: 'Agenda' }]}
          current="Archives"
        />
        <p className="explanation">
          Filtrez la liste à l’aide des menus déroulants ci-dessous.
        </p>
        <div className="archive-menu">
          <Select
            onSelect={selectYear}
            label="année"
            values={years}
            feminine={true}
          />
          <Select onSelect={selectArtist} label="artiste" values={artists} />
        </div>
        <DateListForArchives dates={dates} />
      </div>
      <Footer />
    </Layout>
  );
};

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

export default ArchivePage;
