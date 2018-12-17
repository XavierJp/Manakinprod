import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';
import ArtistsMenu from '../../components/artistsMenu';
import { graphql } from 'gatsby'


export default (props) =>
  <> 
    <Header activeTab={'artists'}/>
    <div styles={styles} className="artist-page">
      <div className='bread-crumb'>
        <a href='/artists'>Artistes</a><span className="hand-separator">&#x261e;</span><a href='/'>{props.data.contentfulArtists.name}</a>
      </div>
      <div className="artist-container">
      {/* <ArtistsMenu  activeArtist={props.data.contentfulArtists.name}/> */}
        <div className="artist-summary">
          <div className="artist-description" dangerouslySetInnerHTML={{ __html: props.data.contentfulArtists.childContentfulArtistsDescriptionTextNode.childMarkdownRemark.html}}/>
        </div>
        <div className="picture">
          <img src={props.data.contentfulArtists.image.fixed.src} alt={props.data.contentfulArtists.image.title}/>
            {props.data.contentfulArtists.show &&
          <div className="artist-shows">
            <h1>Spectacles</h1>
            {props.data.contentfulArtists.show.map(show=>
              (<div key={show.name}>
                <div>{show.name}</div>
                <a className='more' href='/'>En savoir plus</a>
              </div>))}
          </div>
            }
        </div>
        {props.data.contentfulArtists.show &&
          <div className="artist-dates">
            <h1>Prochaines dates</h1>
            {props.data.contentfulArtists.show.reduce((acc,show) => {
              console.log(show)
              return [...acc, ...(show.showdate).map(s=> { return { date:s.dateDuSpectacle, name: show.name }})];
            }, []).sort((a,b)=> a.date < b.date ? 1 : -1).map(showDate=>
              <div key={showDate.name+showDate.date}>
                <div>
                  <span>{new Intl.DateTimeFormat('fr-FR').format(new Date(showDate.date))}</span>
                  <span>{showDate.name}</span>
                </div>
                <a className='more' href='/'>En savoir plus</a>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  </>

export const pageQuery = graphql`
  query($artistId: String!) {
    contentfulArtists(id: {eq: $artistId}) {
      id
      name
      website
      childContentfulArtistsDescriptionTextNode {
        childMarkdownRemark {
          html
        }
      }
      image {
        title
        fixed(width: 500) {
          width
          height
          src
        }
      }
      show {
        name
        showdate {
          dateDuSpectacle
        }
      }
    }
}
`;