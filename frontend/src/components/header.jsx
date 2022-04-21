import React, { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setIsLoggedIn(true);
    }
    else{
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('user')]);

  function signOut(e){
    e.preventDefault();
    localStorage.clear();
    navigate("../home", { replace: true });
  }
  return (
    <nav>
    <NavLink to="/home">
        <h1>URL Shortner</h1>
    </NavLink>

    <ul>
    {isLoggedIn && (<><li>Welcome, {localStorage.getItem('user')}</li>
      <button className='logoutBtn' onClick={signOut}>
      <li className='logoutBtn'>Log out</li>
      </button></>)}
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