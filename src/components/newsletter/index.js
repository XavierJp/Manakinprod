import React from 'react';
import './styles.scss';

class Newsletter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayInput: false,
      email: '',
    };
  }

  toggleTextInput = () => {
    this.setState({ displayInput: !this.state.displayInput }, () => {
      if (this.state.displayInput) this.open();
    });
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
    const { email } = this.state;

    return (
      <div className="newsletter">
        <a href="https://manakinprod.us18.list-manage.com/subscribe/post?u=585d05eb73fc94d89734f03a6&amp;id=9a38620960">
          <span>&#x261e;</span> S'inscrire à la newsletter
        </a>
        {/* {!this.state.displayInput && (
          <div onClick={() => this.setState({ displayInput: true })}>
            <span>&#x261e;</span> S'inscrire à la newsletter
          </div>
        )}
        {this.state.displayInput && (
          <form
            action="https://manakinprod.us18.list-manage.com/subscribe/post?u=585d05eb73fc94d89734f03a6&amp;id=9a38620960"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
          >
            <label htmlFor="mce-EMAIL" className="email-label">
              Adresse email{' '}
            </label>
            <input
              ref={elem => (this.textInput = elem)}
              type="email"
              placeholder="mon adresse email"
              value={email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              name="EMAIL"
              className="required email"
              autoComplete="off"
              autoFocus="true"
              id="mce-EMAIL"
            />
            <input
              type="submit"
              value="&#x261e; Valider"
              name="subscribe"
              id="mc-embedded-subscribe"
              className="button"
            />
          </form>
        )} */}
      </div>
    );
  }
}

export default Newsletter;
