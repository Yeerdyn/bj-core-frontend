import Cookies from 'js-cookie';
import { AUTH_COOKIE, COOKIE_DURATION } from 'src/constants/api';
import { removeUserProfile, saveUserProfile } from 'src/ducks/userProfile';
import store from 'src/store';

function setAccessToken(token: string) {
  Cookies.set(AUTH_COOKIE, token, { expires: COOKIE_DURATION });
  store.dispatch(saveUserProfile({ isAuthorized: true }));
}

function unsetAccessToken() {
  Cookies.remove(AUTH_COOKIE);
  store.dispatch(removeUserProfile());
}

function getAccessToken() {
  return Cookies.get(AUTH_COOKIE);
}

function checkAuthorization() {
  getAccessToken()
    ? store.dispatch(saveUserProfile({ isAuthorized: true }))
    : store.dispatch(removeUserProfile());
}

export { setAccessToken, unsetAccessToken, getAccessToken, checkAuthorization };
