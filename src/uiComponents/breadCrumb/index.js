import React, { Fragment } from 'react';
import './styles.scss';
import Link from '../link';

const BreadCrumb = (props) => (
  <div className="bread-crumb">
    {props.paths &&
      props.paths.map((path) => (
        <Fragment key={path.to + path.label}>
          <Link to={path.to}>{path.label}</Link>
          <span className="hand-separator">&#x261e;</span>
        </Fragment>
      ))}
    <h1>{props.current}</h1>
  </div>
);

export default BreadCrumb;
