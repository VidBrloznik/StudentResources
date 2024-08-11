import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./Home/Home";
import Navigacija from "./Navigacija/Navigacija";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Predmeti from "./Predmeti/Predmeti";
import Predmet from "./Predmeti/Predmet";
import Profil from "./Profil/Profil";
import Gradivo from './Gradivo/Gradivo';
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
    <UserContext.Provider value={{ getUser, setUser }}>
      <Navigacija />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/datoteke" element={<Predmeti />} />
        <Route path="/predmeti" element={<Predmeti />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/predmeti/:predmetId" element={<Predmet />} />
        <Route path="/gradivo/:gradivoId" element={<Gradivo />} />
        <Route path="/predmeti/:predmetId/gradiva" element={<Gradivo />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {
        !
        true &&
        <>
          Debug:
          <p />
          User: {JSON.stringify(getUser)}
        </>
      }
    </UserContext.Provider>
  );
}

export default App;