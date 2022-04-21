import React, { useState } from "react";
import {isEmail, isEmpty} from 'validator';

function Signup() {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  // States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);
const [errorMsg, setErrorMsg] = useState("");

  function handleChange(event){
    const {name, value} = event.target;
    setUser((prevVal)=>{
      return{
        ...prevVal,
        [name]: value
      };
    });
  }

  // Handling the form submission
const handleSubmit = async(e) => {
  e.preventDefault();
  if (user.email === '' || user.password === '') {
  //setErrorMsg("Email or Password can't be blank");
  setError(true);
  } else {
    try {
      const res = await fetch(process.env.REACT_APP_SIGNUP_LINK, {
        method: 'POST', 
        body: JSON.stringify({ email:user.email.toLowerCase(), password:user.password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.status==="error") {
        setErrorMsg(data.error);
        setError(true);
        setSubmitted(false);
        console.error(data.error)
      }
      if (data.status==="Signup Success") {
        console.log(data.user);
        setError(false);
        setErrorMsg('');
        setSubmitted(true);
      }

    }
    catch (err) {
      console.log(err);
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
        <input type="text" name="email" onChange={handleChange} value={user.email} required />
        {!isEmail(user.email) && <div className="error">Please enter a valid email ID</div>}
        
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={user.password} required />
        {isEmpty(user.password) && <div className="error">Please enter a password</div>}
        <button onClick={handleSubmit}>Sign up</button>
        {error && <div className="error">Error: {errorMsg}</div>}
        {submitted && <div className="success">Successfully Registered. Check you mail for verification link(check in spam and promotion tab too)</div>}
      </form>
    </div>
  );
}

export default Signup;
