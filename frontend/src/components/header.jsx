import React, { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('user')){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('user')]);

  return (
    <nav>
    <NavLink to="/home">
        <h1>URL Shortner</h1>
    </NavLink>

    <ul>
    {isLoggedIn && (<><li>Welcome, {localStorage.getItem('user')}</li>
      <NavLink className={(navData) => (navData.isActive ? "btn" : 'none')} to="http://localhost:3500/userauth/signout">
      <li>Log out</li>
      </NavLink></>)}
      {!isLoggedIn && <><NavLink className={(navData) => (navData.isActive ? "btn" : 'none')} to="/signin">
      <li>Log in</li>
      </NavLink>
      <NavLink className={(navData) => (navData.isActive ? "btn" : 'none')} to="/signup">
      <li>Sign up</li>
      </NavLink></>}
    </ul>
    </nav>
  )
}

export default Header