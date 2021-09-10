import React, { useEffect, useState } from 'react';
import './styles.scss';
import { setGACookie, getGACookie, initGA, logPageView } from '../../utils';

const CookieWarning = () => {
  const [showCookie, setShowCookie] = useState(false);

  const accept = (e) => {
    if (e) {
      e.preventDefault();
    }
    setGACookie(true);
    initGA();
    logPageView();
    setShowCookie(false);
  };

  const refuse = (e) => {
    if (e) {
      e.preventDefault();
    }
    setGACookie(false);
    setShowCookie(false);
  };

  useEffect(() => {
    const gaCookie = getGACookie();

    if (gaCookie === undefined) {
      setShowCookie(true);
    }

    if (gaCookie === true) {
      initGA();
    }

    return () => {
      const gac = getGACookie();
      if (gac === undefined) {
        accept();
      }
    };
  }, []);

  return (
    <>
      {showCookie && (
        <div className="cookie-warning">
          <div>
            Afin d’optimiser votre expérience, ce site utilise des cookies, que
            vous acceptez en poursuivant votre navigation.
            <span role="img" aria-label="cookies">
              🍪
            </span>
          </div>
          <div>
            <button className="accept" onClick={accept}>
              D’accord
            </button>
            <button className="refuse" onClick={refuse}>
              Non merci
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieWarning;
