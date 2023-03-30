// import Cookies from 'js-cookie';

// const setAuthCookie = (name, email, id, token) => {
//   const Data ={name,email,id,token}
//   try {
//     Cookies.set('authData',JSON.stringify(Data), {
    
//       expires: 7, //set the cookie to expire in 7 days
//     secure: true, // set the cookie to only be transmitted over HTTPS
//     httpOnly: true, // set the cookie to be inaccessible from client-side JavaScript
//     sameSite: 'strict' // set the cookie to be sent on same-site and cross-site requests
//     });
    
//     console.log('Auth cookie set',{name,email,id,token});
//   } catch (error) {
//     console.log('Error setting auth cookie:', error);
//   }
// };

// const getAuthData = () => {
//   try {
   
//     const authData = Cookies.get('authData');
//     console.log('Auth data:', authData);
//     const cookies=JSON.parse(authData);
//         return cookies;
//   } catch (error) {
//     console.log('Error getting auth data:', error);
   
//   }
// };

// const removeAuthCookie = () => {
//   try {
//     Cookies.remove('authData');
//     console.log('Auth cookie removed');
//   } catch (error) {
//     console.log('Error removing auth cookie:', error);
//   }
// };

// export { setAuthCookie, getAuthData, removeAuthCookie };
