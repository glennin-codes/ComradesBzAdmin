import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

import Products from "./components/Products.jsx";

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

      {/* Your app components */}

 <Products />

    
  
    </ThemeProvider>
  )
}

export default App;
