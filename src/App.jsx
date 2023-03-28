import { useState } from "react";
import "./App.css";

import Products from "./components/Products.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manageproducts from "./components/ManageProduct";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import VerifyEmail from "./components/Verification";

function App() {
 
  

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/manage" element={<Manageproducts />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/verifycode" element={<VerifyEmail />} />
    </Routes>
     
     </BrowserRouter>

  
   
  )
}

export default App;
