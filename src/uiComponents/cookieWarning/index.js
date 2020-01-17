import React, { useRef } from 'react';
import './styles.scss';

export const setCookie = (accept = true) => {
  const d = new Date();
  d.setDate(d.getDate() + 365);

  if (hasCookie()) {
    console.log('already az cookie');
    return;
  }

  document.cookie = `gatsby-gdpr-google-analytics=${accept}; expires=${d.toUTCString()}`;
};

export const hasCookie = () => {
  return document.cookie.indexOf('gatsby-gdpr-google-analytics=') !== -1;
};

export default props => {
  const cookieWarning = useRef(null);

  const acceptOrRefuse = (accept = true) => {
    return e => {
      e.preventDefault();
      setCookie(true);

      if (!!cookieWarning && cookieWarning.current) {
        cookieWarning.current.style.display = 'none';
      }
    };
  };

  return (
    <>
      {!hasCookie() && (
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
      )}
    </>
  );
};
