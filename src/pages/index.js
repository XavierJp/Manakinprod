import React from 'react';

import logo_manakin from '../resources/logo_manakin.png';
import styles from './styles.scss';
import LinkUnderlined from '../uiComponents/linkUnderlined';
import Newsletter from '../components/newsletter';

const artists = [
  {name:'Jonas Chéreau', link:'https://www.jonaschereau.org/'},
  { name:'Volmir Cordeiro',link:'http://volmircordeiro.com/'},
  { name:'Mathilde Delahaye', link:'http://cdntours.fr/mathilde-delahaye'},
  { name:'Nach Anne-Marie Van', link:'http://www.villakujoyama.jp/resident/van-anne-marie-nach/'}
];

export default () => 
  <div styles={styles} className="home">
    <div className="menu">
      <img
      alt="MANAKIN PRODUCTION"
      src={logo_manakin}/>
    </div>
    <div className="artists">
      {artists.map((artist, index)=>
        <div key={index}>
          {index > 0 && (
            <div className="separator">/</div>
          )}
          <LinkUnderlined 
            className="artist-name"
            label={artist.name}
            targetPath={artist.link}
          />
        </div>
      )}
    </div>      
    <div className="team">
    <div>
      <div>Lauren Boyer</div>
      <a href="mailto:lauren@manakinprod.fr">lauren@manakinprod.fr</a>
    </div>
    <div>
      <div>Leslie Perrin</div>
      <a href="mailto:leslie@manakinprod.fr">leslie@manakinprod.fr</a>
    </div>
    </div>
    <Newsletter />
    <div className="summary">
      <div>Plateforme de production</div>
      <div className="separator">/</div>
      <div>MANAKIN part du constat que les spectacles de demain ne sont pas encore nés aujourd'hui.</div>
    </div>
    <div className="adress">15 - 27 rue Moussorgski Paris XVIII</div>
  </div>
