import React from 'react'
import { Link } from "react-router-dom"

function Navbar({search}) {

  let user = window.localStorage.getItem("loggedUser")



  return (
    <nav>
        <Link to={"/"}>Ecom</Link>
        <form className='nav-search-bar-form'>
           <div className='nav-fill'> <input type='text' name='search' value={search} placeholder='Search Ecom'/></div>
          <div><input type='submit' value="search"/></div>
        </form>

        {user ?
         <div>
          <Link to={"/account"}>Account</Link>  
        </div> : <div>
          <Link to={"/login"}>Log in</Link>
        <Link to={"/signup"}>sign up</Link>
        </div>}
        <Link to={"/cart"}>Cart</Link>
        
    </nav>
  )
}

export default Navbar