import React from 'react';

import logo_manakin from '../resources/logo_centered.png';
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
    <div className="logo">
      <img
      alt="MANAKIN PRODUCTION"
      src={logo_manakin}/>
        <p>MANAKIN <span className="separator">&#x2022;</span> <span className="bracket"> plateforme de production </span><br />
        Lauren Boyer & Leslie Perrin<br />
        Paris 18e<br />
        </p>
    </div>
    <div className="main-container">
    <menu>
      <div>AGENDA</div>
    <div className="artists-menu">
      {artists.map((artist, index)=>
        <LinkUnderlined 
        className="artist-name"
        label={artist.name}
        targetPath={artist.link}
        />
        )}
    </div> 
    <div>
      <div>CONTACT / EN SAVOIR +</div>
      <div>SOUTENIR MANAKIN</div>
    </div>
    <div>&#x261e; NEWSLETTER</div>
    {/* <Newsletter /> */}

    </menu>

    <div className="summary">
      <p>
        MANAKIN est une <span className="bracket"> plateforme de
        production </span> co-fondée par <span className="bracket"> Lauren Boyer et Leslie Perrin </span> pour co-construire et développer
        des projets artistiques originaux
        avec
      </p>
      <div className="artists">
        {artists.map((artist, index)=>
          <div key={index}>
            <LinkUnderlined 
              className="artist-name"
              label={artist.name}
              targetPath={artist.link}
              />
              {index < artists.length - 1 && (
                <div className="separator">&#x2022;</div>
              )}
          </div>
        )}
      </div>
    </div>      
  </div>
</div>
