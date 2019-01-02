import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

class LinkUnderlined extends React.Component {
  mouseEnter = () => {
    this.underline.animate(
      [
        {
          width: '0%',
        },
        {
          width: '100%',
        },
      ],
      {
        duration: 150,
        fill: 'forwards',
        easing: 'ease-in-out',
      },
    );
  };

  mouseLeave = () => {
    this.underline.animate(
      [
        {
          width: '100%',
        },
        {
          width: '0%',
        },
      ],
      {
        duration: 150,
        fill: 'forwards',
        easing: 'ease-in-out',
      },
    );
  };

  render() {
    const { label, targetPath, style, highlighted } = this.props;
    return (
      <Link
        style={{ ...styles, ...style }}
        className={`link-underlined ${highlighted ? 'highlighted' : ''}`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        to={targetPath}
      >
        <div className="label">{label}</div>
        <div className="underline" ref={el => (this.underline = el)} />
      </Link>
    );
  }
}

export default LinkUnderlined;
