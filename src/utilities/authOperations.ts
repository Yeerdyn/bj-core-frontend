import Cookies from 'js-cookie'
import {AUTH_COOKIE, COOKIE_DURATION} from "../constants/api";
import {saveUserProfile} from "../ducks/userProfile";

function setAPIToken(token: string) {
  Cookies.set(AUTH_COOKIE, token, { expires: COOKIE_DURATION })
  saveUserProfile({ isAuthorized: true });
}

function unsetApiToken(){
  Cookies.remove(AUTH_COOKIE);
  saveUserProfile({ isAuthorized: false });
}

function getAccessToken() {
  return Cookies.get(AUTH_COOKIE)
}

export {
  setAPIToken,
  unsetApiToken,
  getAccessToken
}
