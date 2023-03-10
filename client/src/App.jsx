import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import Home from "./components/Home"
import Cart from "./components/Cart";

function App() {
  

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cart" element={<Cart />}/>
      </Routes>
    </div>
  );
}

export default App;
