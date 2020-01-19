import 'typeface-fira-mono';
import 'typeface-courier-prime';
import { getGACookie, logPageView } from './src/utils';

export const onRouteUpdate = ({ location, prevLocation }) => {
  const authorizeGACookie = getGACookie();

  if (authorizeGACookie === true) {
    logPageView(location.pathname);
  }
};
