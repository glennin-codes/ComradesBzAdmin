
import "./App.css";

import Products from "./components/Products.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manageproducts from "./components/ManageProduct";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import VerifyEmail from "./components/Verification";
import LandingPage from "./components/Auth/landingPage";
import UserProfile from "./components/Auth/UserProfile";
import { AuthProvider } from "./components/context/AuthContext";

function App() {
 
  

  return (
<AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Products />} />
      <Route path="/manage" element={<Manageproducts />} />
      <Route path="/" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/verifycode" element={<VerifyEmail />} />
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/userprofile" element={<UserProfile />} />

    </Routes>
     
     </BrowserRouter>
     </AuthProvider>

  
   
  )
}

export default App;
