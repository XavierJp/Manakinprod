import React from "react";
import styles from "./styles.scss";
import PropTypes from "prop-types";

class TextInput extends React.Component {
  static defaultProps= {
    label: PropTypes.string.isRequired,
    isEnabled: PropTypes.bool,
    link: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    this.textInput.focus();
  }
  
  inputFocus = () => {
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
  
  inputBlur = () => {
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
      className="text-input" 
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}
      >
      <input 
      type="text" 
      className="label" 
      autoComplete="off" 
      onFocus={this.inputFocus} 
      onBlur={this.inputBlur}
      ref={el=>this.textInput = el}
      />
      <div className="underline" ref={el=>this.underline = el}></div>
      </div>
    );
  }
}

export default TextInput;