import Cookies from 'js-cookie';

const setAuthCookie = (name, email, id, token) => {
  try {
    Cookies.set('authData', {
      name: name,
      email: email,
      id: id,
      token: token
    }, {
    
      expires: 7, //set the cookie to expire in 7 days
    secure: true, // set the cookie to only be transmitted over HTTPS
    httpOnly: true, // set the cookie to be inaccessible from client-side JavaScript
    sameSite: 'none' // set the cookie to be sent on same-site and cross-site requests
    });
    
    console.log('Auth cookie set');
  } catch (error) {
    console.log('Error setting auth cookie:', error);
  }
};

const getAuthData = () => {
  try {
    console.log('Auth data:', authData);
    const authData = Cookies.get('authData');
    
  } catch (error) {
    console.log('Error getting auth data:', error);
   
  }
};

const removeAuthCookie = () => {
  try {
    Cookies.remove('authData');
    console.log('Auth cookie removed');
  } catch (error) {
    console.log('Error removing auth cookie:', error);
  }
};

export { setAuthCookie, getAuthData, removeAuthCookie };
