import { useState } from "react";
import "./App.css";

import Products from "./components/Products.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manageproducts from "./components/ManageProduct";

function App() {
 
  

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/manage" element={<Manageproducts />} />
    </Routes>
     
     </BrowserRouter>

  
   
  )
}

export default App;
