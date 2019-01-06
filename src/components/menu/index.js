import React, { Component } from 'react';
import styles from './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

class Menu extends Component {
  toggleMenu = () => {
    if (!this.menu || !this.burger) {
      return;
    }
    // should check first if js is active

    try {
      this.tryToggleMenu();
    } catch (e) {
      this.menu.classList.toggle('force-visible');
      this.burger.classList.toggle('open');
      // throw e;
    }
  };

  tryToggleMenu = () => {
    if (this.burger.classList.contains('open')) {
      // close
      this.menu.childNodes.forEach((el, index) => {
        el.animate(
          [
            {
              opacity: 1,
              transform: 'translateX(0)',
            },
            {
              opacity: 0,
              transform: 'translateX(-200px)',
            },
          ],
          { delay: index * 100, duration: 175, fill: 'forwards' },
        );
      });
      window.setTimeout(() => this.menu.classList.remove('visible'), 400);
    } else {
      // opens
      this.menu.childNodes.forEach((el, index) => {
        el.animate(
          [
            {
              opacity: 0,
              transform: 'translateX(-200px)',
            },
            {
              opacity: 1,
              transform: 'translateX(0)',
            },
          ],
          {
            delay: index * 100,
            duration: 150,
            fill: 'forwards',
          },
        );
      });
      this.menu.classList.add('visible');
    }
    this.burger.classList.toggle('open');
  };

  render() {
    const { activeTab } = this.props;
    return (
      <menu styles={styles}>
        <div ref={el => (this.menu = el)}>
          <LinkUnderlined
            targetPath="/artists"
            label="ARTISTES"
            highlighted={activeTab === 'artists'}
          />
          <LinkUnderlined
            targetPath="/agenda"
            label="AGENDA"
            highlighted={activeTab === 'agenda'}
          />
          <LinkUnderlined
            targetPath="/more"
            label="EN SAVOIR +"
            highlighted={activeTab === 'more'}
          />
          {/* <LinkUnderlined
            className="newletter"
            targetPath="/"
            label="&#x261e; NEWSLETTER"
            highlighted={activeTab === 'newsletter'}
          /> */}
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
