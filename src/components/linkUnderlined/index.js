import React from "react";
import styles from "./styles.scss";
import PropTypes from "prop-types";

class LinkUnderlined extends React.Component {
  static defaultProps= {
    label: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool,
    link: PropTypes.string.isRequired,
  }

  mouseEnter = () => {
    this.underline.animate([{
      width:'0%',
    },{
      width:'100%',
    }], {
      duration:150,
      fill: 'forwards',
      easing: 'ease-in-out',
    })
  }

  mouseLeave = () => {
    this.underline.animate([{
      width:'100%',
    },{
      width:'0%',
    }], {
      duration:150,
      fill: 'forwards',
      easing: 'ease-in-out',
    })
  }
  
  render() {
    const { label, link } = this.props;
    
    return (
      <div  style={styles} 
        className="link-underlined" 
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        >
        <a className="label" href={link} target="_blank">{label}</a>
        <div className="underline" ref={el=>this.underline = el}></div>
      </div>
    );
  }
}

export default LinkUnderlined;