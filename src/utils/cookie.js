/**
 * Set a new cookie in document. Default expiry date is one year
 *
 * @param {*} cookie
 * @param {*} expiryDate
 */
export const setCookie = (cookie, expiryDate, sameSite = true) => {
  const d = expiryDate || new Date();
  d.setDate(d.getDate() + 365);
  const newCookie = `${cookie}; expires=${d.toUTCString()};${sameSite &&
    'samesite=lax;'}`;
  document.cookie = newCookie;
};
/**
 * get a cookie, by its name.
 * Returns first occurence
 * Undefined if no cookie found
 *
 * @param {*} cookieName
 */
export const getCookie = cookieName => {
  // window check for SSR
  if (typeof window !== 'undefined') {
    const matchingCookie = document.cookie
      .split(';')
      .filter(item => item.trim().startsWith(`${cookieName}=`))
      .map(item => item.replace(`${cookieName}=`, '').trim());
    return matchingCookie.length > 0 ? matchingCookie[0] : undefined;
  }
  return undefined;
};
