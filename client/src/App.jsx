
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";

// components
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import Home from "./components/Home"
import Cart from "./components/Cart";
import Signin from "./components/Signin";
import Account from "./components/Account";
import CreateAccountCart from "./components/CreateAccountCart";

function App() {
  const {token} = useSelector(state => state.userReducer)

  

  return (
    <div className="App">
     <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/cart" element={token ? <Cart /> : <CreateAccountCart />}/>
        <Route path="/account" element={token ? <Account /> : <Login />}/>
        <Route path="/logout" element={<Navigate to={"/"}/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
