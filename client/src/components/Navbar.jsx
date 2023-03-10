import React from 'react'
import { Link } from "react-router-dom"

function Navbar({search}) {
  return (
    <nav>
        <Link to={"/"}>Ecom</Link>
        <form className='nav-search-bar-form'>
           <div className='nav-fill'> <input type='text' name='search' value={search} placeholder='Search Ecom'/></div>
          <div><input type='submit' value="search"/></div>
        </form>

        <Link to={"/login"}>Log in</Link>
        <Link to={"/cart"}>Cart</Link>
        
    </nav>
  )
}

export default Navbar