import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import '../css/style.css';
import Home from "./Home/Home"
import Navigacija from "./Navigacija/Navigacija"
import Login from "./Login/Login";
import Register from "./Register/Register";
import { UserContext } from "../contexts/contexts";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [getUser, setUser] = useState({
    loggedIn: false,
    user_id: "",
    user_name: "",
    user_surname: "",
    user_email: ""
  });

  return (
    <>

      <UserContext.Provider value={{ getUser, setUser }}>
        <Navigacija />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
