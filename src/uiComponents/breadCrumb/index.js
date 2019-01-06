import React from 'react';
import styles from './styles.scss';
import Link from '../link';


export default props => (
  <div style={styles} className="bread-crumb">
    {props.paths &&
      props.paths.map(path => (
        <>
          <Link to={path.to}>{path.label}</Link>
          <span className="hand-separator">&#x261e;</span>
        </>
      ))}
    <h1>{props.current}</h1>
  </div>
);
