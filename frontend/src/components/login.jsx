import React, { useState } from "react";
// For nagition to different page
import { useNavigate } from "react-router-dom";
// For validation user input
import { isEmail, isEmpty } from "validator";

//Function to signin a user with email and password
function Signin() {
  //state to make a controlled form with email and password value
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //state to keep track of error and store error msg
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const DEBUG = process.env.REACT_APP_DEBUG;
  //for using useNavigate hook
  let navigate = useNavigate();

  //for making controlled form and storing user input value in relevant state field
  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If user email or password is empty then setError to true
    if (user.email === "" || user.password === "") {
      //setErrorMsg("Email or Password can't be blank");
      setError(true);
    }
    // Else try making post request with email and passowrd to backend for login
    else {
      try {
        const res = await fetch(process.env.REACT_APP_SIGNIN_LINK, {
          method: "POST",
          body: JSON.stringify({
            email: user.email.toLowerCase(),
            password: user.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        // waiting for data after post request
        const data = await res.json();
        if (DEBUG) console.log(data);

        //if user is returned after login show success msg and send user back to homepage
        //also store jwt token and user email in localstorage
        //set errors to false and clear error msg
        if (data.user) {
          if (DEBUG) console.log("logged in user " + data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
          navigate("../home", { replace: true });
          setErrorMsg("");
          setError(false);
        }
        //if user is received after post request then set error to true and set error message
        else {
          if (DEBUG) console.error("inside error" + data.error);
          setErrorMsg(data.error);
          setError(true);
        }
      } catch (err) {
        //if some error occurs then set error to true and set error message
        if (DEBUG) console.error("catch err" + err);
        setErrorMsg(err.error);
        setError(true);
      }
    }
  };

  return (
    <div>
      <form>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        {/* Controlled for with two way binding using value and onChange */}
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={user.email}
        />
        {!isEmail(user.email) && (
          <div className="error">Please enter a valid email ID</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
        />
        {isEmpty(user.password) && (
          <div className="error">Please enter your password</div>
        )}
        <button onClick={handleSubmit}>login</button>
        {error && <div className="error">Error: {errorMsg}</div>}
      </form>
    </div>
  );
}

export default Signin;
