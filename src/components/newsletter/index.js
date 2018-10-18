import React, { Fragment } from "react";
import styles from "./styles.scss";
import LinkUnderlined from '../../uiComponents/linkUnderlined';


class Newsletter extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      displayInput: false,
      email: ''
    };
  }

  toggleTextInput = () => {
    this.setState({displayInput:!this.state.displayInput}, ()=> {
      if (this.state.displayInput) this.open();
    });
  }
  
  open = () => {
    this.textInput.animate([{
      width:'0',
    },{
      width:'200px',
    }], {
      duration:150,
      fill: 'forwards',
      easing: 'ease-in-out',
    })
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
    const { email } = this.state;

    return (
      <div  style={styles} 
        className="newsletter" 
        >
        { !this.state.displayInput && (
          <LinkUnderlined 
            label={'Newsletter'} 
            targetPath={''}
            style={{textTransform: 'uppercase'}}
            onClick={this.toggleTextInput}>Newsletter</LinkUnderlined>
        )}
        { this.state.displayInput && (
          <form 
          action="https://manakinprod.us18.list-manage.com/subscribe/post?u=585d05eb73fc94d89734f03a6&amp;id=9a38620960" 
          method="post" 
          id="mc-embedded-subscribe-form" 
          name="mc-embedded-subscribe-form" 
          className="validate">
              <label htmlFor="mce-EMAIL" className="email-label">Adresse email </label>  
              <input 
              ref={elem => this.textInput = elem}
              type="email"
              placeholder="mon adresse email"
              value={email}
              onChange={(e)=>{this.setState({email: e.target.value})}}
              name="EMAIL"
              className="required email"
              autoComplete="off"
              autoFocus="true"
              id="mce-EMAIL"
              />
              <div
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              className="submit-button"
              >
                <input 
                type="submit" 
                value="Valider l’inscription" 
                name="subscribe" 
                id="mc-embedded-subscribe" 
                className="button" />
                <div className="underline" ref={el=>this.underline = el}></div>
              </div>
            </form>
        )}
      </div>
    );
  }
}

export default Newsletter;