import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';


export default (props) => 
  <div styles={styles} className="home">
    <Header />
    <div className="summary">
      <div className="artist">
        <div className="summary">
        <h1>{props.data.contentfulArtists.name}</h1>
        <div>{props.data.contentfulArtists.childContentfulArtistsDescriptionTextNode.description}</div>
        </div>
        <div className="picture">
          <img src={props.data.contentfulArtists.image.fixed.src} alt={props.data.contentfulArtists.image.title}/>
        </div>
        <div className="agenda">
        </div>
      </div>
    </div>      
  </div>

export const pageQuery = graphql`
query($artistId: String!) {
    contentfulArtists(id: {eq: $artistId}) {
      id
      name
      website
      childContentfulArtistsDescriptionTextNode {
        id
        description
      }
      image {
        title
        fixed(width: 500) {
          width
          height
          src
        }
      }
    }
}
`;