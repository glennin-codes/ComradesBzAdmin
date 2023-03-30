import Cookies from 'js-cookie';

const setAuthCookie = (name, email, _id, token) => {
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
const getAuthData = () => {
    const authData = Cookies.getJSON('authData');
    return authData ? authData : null;
  }
export  { 
    setAuthCookie,
    getAuthData
}