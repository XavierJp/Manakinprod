import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
  static defaultProps = {
    onChange: PropTypes.func,
  };

  componentDidMount = () => {
    this.open();
  };

  onChange = e => {
    if (this.props.onChange) {
      this.props.onChange(this.textInput.value);
    }
  };

  open = () => {
    this.textInput.animate(
      [
        {
          width: '0',
        },
        {
          width: '200px',
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
    return (
      <div className="text-input">
        <input
          type="text"
          autoComplete="off"
          autoFocus="true"
          placeholder="mon adresse email"
          ref={el => (this.textInput = el)}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default TextInput;
