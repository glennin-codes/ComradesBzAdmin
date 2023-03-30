import Cookies from 'js-cookie';

export const setAuthCookie = (name, email, _id, token) => {
    Cookies.set('authData', {
      name: name,
      email: email,
      id: _id,
      token: token
    }, {
      expires: 7, // set the cookie to expire in 7 days
      secure: true, // set the cookie to only be transmitted over HTTPS
      httpOnly: true, // set the cookie to be inaccessible from client-side JavaScript
      sameSite: 'strict' // set the cookie to only be sent on same-site requests
    });
}
// To get the auth data from the cookie
export const getAuthData = () => {
    const authData = Cookies.getJSON('authData');
    return authData ? authData : null;
  }
// To remove the auth data from the cookie
export const removeAuthCookie = () => {
    Cookies.remove('authData');
  }
