import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {isEmail, isEmpty} from 'validator';

function Signin() {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
  //setErrorMsg("Email or Password can't be blank");
  setError(true);
  } else {
    try {
      const res = await fetch(process.env.REACT_APP_SIGNIN_LINK, {
        method: 'POST', 
        body: JSON.stringify({ email:user.email.toLowerCase(), password:user.password }),
        headers: {'Content-Type': 'application/json'},
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem('token',data.token);
      if (data.user) {
        console.log('logged in user '+data.user);
        localStorage.setItem('user',data.user);
        navigate("../home", { replace: true });
        setErrorMsg('');
        setError(false);
      }
      else{
        console.error('inside error' + data.error);
        setErrorMsg(data.error);
        setError(true);
      }

    }
    catch (err) {
      console.error('catch err' + err);
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
        <input type="text" name="email" onChange={handleChange} value={user.email}/>
       {!isEmail(user.email) && <div className="error">Please enter a valid email ID</div>}
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={handleChange} value={user.password}/>
        {isEmpty(user.password) && <div className="error">Please enter your password</div>}
        <button onClick={handleSubmit}>login</button>
        {error && <div className="error">Error: {errorMsg}</div>}
      </form>
    </div>
  );
}

export default Signin;
