import React from "react";
import "../styles/navbar.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/features/userSlice";

function Navbar({ search }) {
  const { username } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(logOut());
  };

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

      {username ? (
        <div className="linksIfUser">
          <Link className="lIU_account" to={"/account"}>Account</Link>
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
