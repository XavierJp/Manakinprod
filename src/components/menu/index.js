import React, { Component } from 'react';
import styles from './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

class Menu extends Component {
  toggleMenu = () => {
    if (!this.menu || !this.burger) {
      return;
    }
    this.burger.classList.toggle('open');
    this.menu.classList.toggle('visible');
  };

  render() {
    const { activeTab } = this.props;
    return (
      <menu styles={styles} ref={el => (this.menu = el)}>
        <div>
          <LinkUnderlined
            targetPath="agenda"
            label="AGENDA"
            highlighted={activeTab === 'agenda'}
          />
          <LinkUnderlined
            targetPath="artists"
            label="ARTISTES"
            highlighted={activeTab === 'artists'}
          />
          <LinkUnderlined
            targetPath="more"
            label="EN SAVOIR +"
            highlighted={activeTab === 'more'}
          />
          <LinkUnderlined
            className="newletter"
            label="&#x261e; NEWSLETTER"
            highlighted={activeTab === 'newsletter'}
          />
          {/* <Newsletter /> */}
        </div>
        <div
          className="hamburger"
          ref={el => (this.burger = el)}
          onClick={this.toggleMenu}
        >
          <span />
          <span />
          <span />
        </div>
      </menu>
    );
  }
}

export default Menu;
