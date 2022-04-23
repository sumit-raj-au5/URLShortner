import React, { useState } from "react";
//using validator to validate user input
import { isEmail, isEmpty } from "validator";

function Signup() {
  //for storing user input and making controlled form
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // States for checking the errors and submission state
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const DEBUG = +process.env.REACT_APP_DEBUG;

  // storing user input in the relevant state variable
  //triggered on user input in form
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
    // If value entered is empty then setError to true
    if (user.email === "" || user.password === "") {
      //setErrorMsg("Email or Password can't be blank");
      setError(true);
    }
    // else send user email and password value to backend using POST request
    //backend will send varification email to user and after user varification user can sign in
    else {
      try {
        const res = await fetch(process.env.REACT_APP_SIGNUP_LINK, {
          method: "POST",
          body: JSON.stringify({
            email: user.email.toLowerCase(),
            password: user.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        //waiting for response from server
        const data = await res.json();
        if (DEBUG) console.log(data);
        //if error response is receive then error is set and error meggage is set with appropriate message
        if (data.status === "error") {
          setErrorMsg(data.error);
          setError(true);
          setSubmitted(false);
          if (DEBUG) console.error(data.error);
        }
        //if signup is success then error is cleared and setsubmitted is set true
        if (data.status === "Signup Success") {
          if (DEBUG) console.log(data.user);
          setError(false);
          setErrorMsg("");
          setSubmitted(true);
        }
      } catch (err) {
        if (DEBUG) console.log(err);
        setErrorMsg(err);
        setError(true);
        setSubmitted(false);
      }
    }
  };

  return (
    <div>
      <form>
        <h2>Sign up</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={user.email}
          required
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
          required
        />
        {isEmpty(user.password) && (
          <div className="error">Please enter a password</div>
        )}
        <button onClick={handleSubmit}>Sign up</button>
        {error && <div className="error">Error: {errorMsg}</div>}
        {submitted && (
          <div className="success">
            Successfully Registered. Check you mail for verification link(check
            in spam and promotion tab too)
          </div>
        )}
      </form>
    </div>
  );
}

export default Signup;
