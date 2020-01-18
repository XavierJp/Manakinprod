import React, { useRef, useEffect } from 'react';
import './styles.scss';
import { setGACookie, getGACookie, initGA, logPageView } from '../../utils';

export default () => {
  const cookieWarning = useRef(null);

  const acceptOrRefuse = (accept = true) => {
    return e => {
      e.preventDefault();

      setGACookie(accept);

      if (accept) {
        initGA();
        logPageView();
      }

      if (!!cookieWarning && cookieWarning.current) {
        cookieWarning.current.style.display = 'none';
      }
    };
  };

  useEffect(() => {
    console.log('mount');
    // mount
    return () => {
      console.log('unmount');
      // unmount
      const gac = getGACookie();
      if (gac === undefined) {
        setGACookie(true);
      }
    };
  }, []);

  return (
    <>
      <div className="cookie-warning" ref={cookieWarning}>
        <div>
          Afin d’optimiser votre expérience, ce site utilise des cookies, que
          vous acceptez en poursuivant votre navigation.
          <span role="img" aria-label="cookies">
            🍪
          </span>
        </div>
        <div>
          <button className="accept" onClick={acceptOrRefuse(true)}>
            Ok
          </button>
          <button className="refuse" onClick={acceptOrRefuse(false)}>
            Non merci
          </button>
        </div>
      </div>
    </>
  );
};
