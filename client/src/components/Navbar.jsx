import React, {useState} from "react";
import "../styles/navbar.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/userSlice";

import CreateStore from "./CreateStore";

function Navbar({ search }) {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false)

  const handleLogout = () => {
    dispatch(logOut());
  };

  const showAccountOptions = () =>{
    setIsShown(true)
  }
  
  const hideAccountOpt = () =>{
    setIsShown(false)
  }

  return (
    <nav className="nav_container">
      <Link to={"/"} className="nav_logo">Ecom</Link>
      <form className="nav_search-form">
        <div className="nav-fill">
          {" "}
          <input
          className="formInput"
            type="text"
            name="search"
            value={search}
            placeholder="Search Ecom"
          />
        </div>
        <div className="formButton_container">
          <input className="formButton" type="submit" value="search" />
        </div>
      </form>

      {user.username ? (
        <div className="linksIfUser">
          <div className="accountLinks" onMouseOver={showAccountOptions} onMouseOut={hideAccountOpt}>
          <Link className="lIU_account"  to={"/account"}>Account</Link>
          {(isShown) && user.store ? <Link className="createStore" to={"/"}>Store</Link> : <Link className="createStore" to={"/createstore"}>Create store</Link>}
          </div>
          <Link className="lIU_Lout" onClick={handleLogout} to={"/logout"}>Log out</Link>
        </div>
      ) : (
        <div className="linksIfNoUser">
          <Link className="login"  to={"/login"}>Log in</Link>
          <Link className="signin" to={"/signin"}>Sign in</Link>
        </div>
      )}
      <div className="cartContainer">
      <Link className="cartLinkk" to={"/cart"}>Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
