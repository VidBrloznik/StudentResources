import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import '../css/style.css';
import Home from "./Home/Home";
import Navigacija from "./Navigacija/Navigacija";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Profil from "./Profil/Profil";
import Predmeti from "./Predmeti/Predmeti";
import { UserContext } from "../contexts/contexts";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
function App() {
  const [getUser, setUser] = useState({
    loggedIn: true,
    user_id: "1",
    user_name: "Janez",
    user_surname: "Novak",
    user_email: "janez.novak@example.com",
    vloga: "0",
    fakulteta: "Fakulteta za računalništvo in informatiko"
  });

  return (
    <>
      <UserContext.Provider value={{ getUser, setUser }}>
        <Navigacija />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/predmeti" element={<Predmeti />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
