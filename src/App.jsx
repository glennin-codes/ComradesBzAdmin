import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Products from "./components/Products.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manageproducts from "./components/ManageProduct";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0066cc',
      },
    },
  });
  

  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/manage" element={<Manageproducts />} />
    </Routes>
     
        </BrowserRouter>

      {/* Your app components */}

 

    
  
    </ThemeProvider>
  )
}

export default App;
