import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css'

import backendUrl from '../../function-library/setBackendUrl'

function Login() {
  const [loginPayload, setLoginPayload] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [loginResponse, setLoginResponse] = useState({})

  function handleChange(changes){
    setLoginPayload({...loginPayload, ...changes})
  }
  async function handleLoginFormSubmit(event) {
    console.log(`backendurl: ${backendUrl}`)

    //check the data
    if(loginPayload.email ==='') {
      return alert('email is required')
    } else if (loginPayload.password === '') {
      return alert('password is required')
    }
    const response = () => {
      return fetch(`${backendUrl}/api/v1/users/login`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.success === true) {
          alert('login successful')
          

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
      )
}


export default Login;