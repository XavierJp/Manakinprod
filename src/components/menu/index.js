import React, { Component } from 'react';
import './styles.scss';
import LinkUnderlined from '../../uiComponents/linkUnderlined';

class Menu extends Component {
  handleKeyDown = event => {
    // check keys if you want
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      this.toggleMenu();
    }
  };

  toggleMenu = () => {
    if (!this.menu || !this.burger) {
      return;
    }
    try {
      this.tryToggleMenu();
    } catch (e) {
      this.menu.classList.toggle('force-visible');
      this.burger.classList.toggle('open');
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
      <menu>
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
        </div>
        <div
          className="hamburger"
          ref={el => (this.burger = el)}
          onClick={this.toggleMenu}
          onKeyDown={this.handleKeyDown}
          role="menu"
          aria-label="burger-trigger"
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
