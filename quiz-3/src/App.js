import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Route/Routes";
import { LoginProvider } from "./Kontex/Login";
import "./Asset/css/style.css";


function App() {
  return (
    <Router>
      <LoginProvider>
        <Routes />
      </LoginProvider>
    </Router>
  );
}


export default App;
