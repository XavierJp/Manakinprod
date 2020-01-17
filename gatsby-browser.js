import 'typeface-fira-mono';
import 'typeface-courier-prime';
import { hasCookie, setCookie } from './src/uiComponents/cookieWarning';

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (!!prevLocation) {
    if (!hasCookie()) {
      setCookie(true);
    }
  }
};
