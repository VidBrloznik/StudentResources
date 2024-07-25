import React from "react";
import { Route, Routes } from "react-router-dom";
import '../css/style.css';
import Home from "./Home/Home"
import Navigacija from "./Navigacija/Navigacija"

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>

      <Navigacija />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </>
  );
}

export default App;
