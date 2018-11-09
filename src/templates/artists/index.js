import React from 'react';
import styles from './styles.scss';
import Header from '../../components/header';


export default (props) => 
  <div styles={styles} className="home">
    <Header />
    <div className="summary">
      <div className="artist">
        <div className="summary">
        <h1>{props.name}</h1>
        <div>{props.description}</div>
        </div>
        <div className="picture">
        <img src={props.image.fixed.src} alt={props.image.title}/>
        </div>
        <div className="agenda">
        </div>
      </div>
    </div>      
  </div>
