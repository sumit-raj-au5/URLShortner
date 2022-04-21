import React, { useState } from "react";

function Signup() {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  // States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

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
  setError(true);
  } else {
    try {
      const res = await fetch(process.env.REACT_APP_SIGNUP_LINK, {
        method: 'POST', 
        body: JSON.stringify({ email:user.email, password:user.password }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setError=true;
      }
      if (data.user) {
        console.log(data.user);
      }

    }
    catch (err) {
      console.log(err);
    }
  setSubmitted(true);
  setError(false);
  }
  };
  
  // Showing success message
  const successMessage = () => {
  return (
  <div
  className="success"
  style={{
  display: submitted ? '' : 'none',
  }}>
  <h1>Successfully registered!!</h1>
  </div>
  );
  };
  
  // Showing error message if error is true
  const errorMessage = () => {
  return (
  <div
  className="error"
  style={{
  display: error ? '' : 'none',
  }}>
  <h1>Please enter all the fields</h1>
  </div>
  );
  };
  

  return (
    <div>
    {/* Calling to the methods */}
<div className="messages">
{errorMessage()}
{successMessage()}
</div>

      <form>
        <h2>Sign up</h2>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={handleChange} value={user.email} required />
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={user.password} required />
        <div className="password error"></div>
        <button onClick={handleSubmit}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
