import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../../css/app.css'
import {setBackendUrl} from '../../config.js'
import crypto  from 'crypto'

//From .env or heroku config variables
let backendUrl = setBackendUrl()

function Registration() {
  const [registrationForm, setRegistrationForm] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  })

  function handleChange(changes){
    setRegistrationForm({...registrationForm, ...changes})
  }

  function hashPassword(email, password) {
    let hash = crypto.createHash('sha256');
    hash.update(email+password);
    let hashedPassword = hash.digest('hex')
    return hashedPassword
  }
  function handleRegistrationFormSubmit(event) {
    
    console.log(`backendurl: ${backendUrl}`)

    //check the data
    if(registrationForm.email ==='' || registrationForm.username === '') {
      return alert('username and email is required')
    } else if (registrationForm.password === '' || registrationForm.verifyPassword === '') {
      return alert('password is required')
    } else if (registrationForm.password !== registrationForm.verifyPassword) {
      return alert("passwords don't match")
    } 
    let registrationPayload = { username: registrationForm.username, email: registrationForm.email, password: hashPassword(registrationForm.email, registrationForm.verifyPassword) }
      fetch(`${backendUrl}/api/v1/users/create`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationPayload),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.success === true) {
          alert('registration successful')
          window.location = '/login'
        } else { alert(`registration failed: ${data.message}`)}
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  

      event.preventDefault()
  
  }

  function forceLower(){
    setRegistrationForm({...registrationForm, username: registrationForm.username.toLowerCase()})
  }
     return (
        <div className="loginForm">
          <h1>Registration</h1>
          
          <form>
           <input 
            type="username" 
            placeholder="Enter username" 
            name="username"
            className="registration__input"
            value={registrationForm.username}
            onKeyUp={()=>forceLower()}
            onChange= { event => handleChange({username: event.target.value})}></input>
            
            <input 
            type="email" 
            placeholder="Enter email" 
            name="email"
            className="registration__input"
            value={registrationForm.email}
            onChange= { event => handleChange({email: event.target.value})}></input>
            
            <input 
            type="password" 
            placeholder="Enter password" 
            name="password"
            className="registration__input"
            value={registrationForm.password}
            onChange = {event => handleChange({password: event.target.value})}></input>
            
            <input 
            type="password" 
            placeholder="Re-enter password"  
            name="verifyPassword"
            className="registration__input"
            value={registrationForm.verifyPassword}
            onChange={ event => handleChange({verifyPassword: event.target.value})}></input>
            
            <div><button className="btn btn--primary btn--submit" onClick={(event)=>handleRegistrationFormSubmit(event)}>Submit</button></div>
          </form> 
          
          <Link to="/login">
          <div className="already-registered">Already Registered?</div>
          </Link>
          



        </div>
      )
}


export default Registration;