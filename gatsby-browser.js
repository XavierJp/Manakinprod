import 'typeface-fira-mono';
import 'typeface-courier-prime';
import { getGACookie, initGA, logPageView } from './src/utils';

export const onRouteUpdate = ({ location, prevLocation }) => {
  const isFirstPage = !prevLocation;
  const authorizeGACookie = getGACookie();

  // cookie not authorized
  if (authorizeGACookie === false) {
    return;
  }

  // first page AND cookie authorized (from previous visit) -> setup GA
  if (authorizeGACookie === true && isFirstPage) {
    initGA();
  }

  if (authorizeGACookie === true) {
    logPageView(location.pathname);
  }
};
