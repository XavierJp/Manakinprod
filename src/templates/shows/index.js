import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import Layout from '../../uiComponents/layout';
import { graphql } from 'gatsby';
import BreadCrumb from '../../uiComponents/breadCrumb';

const breadCrumbPath = [
  {
    to: '/artists',
    label: 'Artistes',
  },
];

export default props => (
  <Layout>
    <Header activeTab={'artists'} />
    <div styles={styles} className="show-page">
      <BreadCrumb
        paths={breadCrumbPath}
        current={props.data.contentfulShow.name}
      />
      <div className="show-container">
        <div className="first-col">
          <div className="show-description">
            {props.data.contentfulShow.name}
          </div>
        </div>
        <div className="second-col" />
      </div>
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query($showId: String!) {
    contentfulShow(id: { eq: $showId }) {
      id
      name
    }
  }
`;
