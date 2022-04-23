import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  //states to check if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //navigate hook is used to navigate from one page to another programatically
  const navigate = useNavigate();
  //const DEBUG = +process.env.REACT_APP_DEBUG;
  //useEfect will run on first page and and when there is any change in dependency list
  //here we are checking for user key in local storage and if user is logged in then it will be having user email value
  //useEffect will rerender the page on change of dependency list
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("user")]);

  //when user signout this function will delete values stored in local storage i.e user and jwt key
  function signOut(e) {
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
        {/* If user is logged in then we are displaying user email and logout button */}
        {isLoggedIn && (
          <>
            <li>Welcome, {localStorage.getItem("user")}</li>
            <button className="logoutBtn" onClick={signOut}>
              <li className="logoutBtn">Log out</li>
            </button>
          </>
        )}
        {/* When user is not logged in then we are displaying both signup and signin options */}
        {!isLoggedIn && (
          <>
            <NavLink
              className={(navData) => (navData.isActive ? "btn" : "none")}
              to="/signin"
            >
              <li>Log in</li>
            </NavLink>
            <NavLink
              className={(navData) => (navData.isActive ? "btn" : "none")}
              to="/signup"
            >
              <li>Sign up</li>
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
