import React from "react";
import styles from "./styles.scss";
import PropTypes from "prop-types";

class LinkUnderlined extends React.Component {
  static defaultProps= {
    label: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool,
    targetPath: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
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
    const { label, targetPath, onClick, style } = this.props;

    
    return (
      <div  style={{...styles, ...style}}
        className="link-underlined" 
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={onClick}
        >
        { !!targetPath && (
          <a className="label" href={targetPath} target="_blank">{label}</a>
        )}
        { !targetPath && (
          <div className="label">{label}</div>
        )}
        <div className="underline" ref={el=>this.underline = el}></div>
      </div>
    );
  }
}

export default LinkUnderlined;