import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import crypto  from 'crypto'
import '../../css/app.css'
import {setBackendUrl} from '../../config.js'

function Login() {
  let backendUrl = setBackendUrl()
  
  function hashPassword(email, password) {
    let hash = crypto.createHash('sha256');
    hash.update(email+password);
    let hashedPassword = hash.digest('hex')
    return hashedPassword
  }
 

  const [loginForm, setloginForm] = useState({
    email: '',
    password: ''
    
  })
  const [isAuthenticated, setisAuthenticated] = useState(false)
  
  function handleChange(changes){
    setloginForm({...loginForm, ...changes})
  }

  async function handleLoginFormSubmit(event) {
    console.log(`backendurl: ${backendUrl}`)
   
    
    //check the data
    if(loginForm.email ==='') {
      return alert('email is required')
    } else if (loginForm.password === '') {
      return alert('password is required')
    }
    const response = () => {
      return fetch(`${backendUrl}/api/v1/users/login`, {
        credentials: "include", 
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...loginForm, password: hashPassword(loginForm.email, loginForm.password)}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        localStorage.setItem("isLoggedIn", data.success)
        if(data.success === true) {
          setisAuthenticated(true) 
         
          

          //window.location = '/'
        } else { alert(`registration failed: ${data.message}`)}
      })
      .catch((error) => {
        console.error('Error:', error); 
      });
     
    }
    response()

    event.preventDefault()
  }

     return (
      !isAuthenticated ? (

        <div className="loginForm">
          <h1>Login</h1>
          <form>
            <div></div>
            <label htmlFor="email"></label>
            <input type="email" placeholder="Enter Email" name="email"
            onChange= { event => handleChange({email: event.target.value})}></input>
            <div></div>
            <label htmlFor="password"></label>
            <input type="password" placeholder="Enter Password" name="password"
            onChange= { event => handleChange({password: event.target.value})}></input>
            <div><button className="btn btn--primary btn--submit" onClick={(event)=>handleLoginFormSubmit(event)}>Login</button></div>
         
          </form> 
          <Link to="/registration">
          <div className="not-registered">Not Registered?</div>
          </Link>

        </div>
      ) : <Redirect to='/home'/>
      )
}


export default Login;