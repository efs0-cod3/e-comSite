import React from "react";
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
    <nav>
      <Link to={"/"}>Ecom</Link>
      <form className="nav-search-bar-form">
        <div className="nav-fill">
          {" "}
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search Ecom"
          />
        </div>
        <div>
          <input type="submit" value="search" />
        </div>
      </form>

      {username ? (
        <div>
          <Link to={"/account"}>Account</Link>
          <Link onClick={handleLogout} to={"/logout"}>Log out</Link>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>Log in</Link>
          <Link to={"/signin"}>Sign in</Link>
        </div>
      )}
      <Link to={"/cart"}>Cart</Link>
    </nav>
  );
}

export default Navbar;
