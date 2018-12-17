
import React from 'react';
import styles from './styles.scss';
import { StaticQuery, graphql } from "gatsby";
import LinkUnderlined from '../../uiComponents/linkUnderlined';
import { sanitizeName } from '../../utils'

const ArtistMenu = (props) => (
  <StaticQuery
    query={graphql`
      query artistsForMenu
      {
        allContentfulArtists { edges {
          node {
            id
            name,
            website
          }
        } }
      }
    `}
    render={data => (
      <div styles={styles} className="artist-menu">
        {data.allContentfulArtists.edges.map((artist, index)=>
          <LinkUnderlined 
          key={index}
          highlighted={props.activeArtist===artist.node.name}
          className="artist-name"
          label={artist.node.name}
          targetPath={`${sanitizeName(artist.node.name, artist)}`}
          />
        )}
      </div>
    )}
  />
)


export default ArtistMenu;