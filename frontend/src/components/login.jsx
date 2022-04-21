import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Signin() {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

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
      const res = await fetch(process.env.REACT_APP_SIGNIN_LINK, {
        method: 'POST', 
        body: JSON.stringify({ email:user.email, password:user.password }),
        headers: {'Content-Type': 'application/json'},
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem('token',data.token);

      if (data.errors) {
        console.log(data.errors)
        setError(true);
      }
      if (data.user) {
        console.log('logged in user '+data.user);
        localStorage.setItem('user',data.user);
        navigate("../home", { replace: true });
      }

    }
    catch (err) {
      console.log('catch err' + err);
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
    <div className="messages">
{errorMessage()}
{successMessage()}
</div>
      <form>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={handleChange} value={user.email}/>
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={user.password}/>
        <div className="password error"></div>
        <button onClick={handleSubmit}>login</button>
      </form>
    </div>
  );
}

export default Signin;
