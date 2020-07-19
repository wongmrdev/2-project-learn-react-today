import React, { } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css'
import {} from 'uuid/v4'

function Registration() {


     return (
        <div className="loginForm">
          <h1>Registration</h1>
          
          <form>
            <div>Email</div>
            <input type="email" name="email"></input>
            <div>Password</div>
            <input type="password" name="password"></input>
            <div>Re-type Password</div>
            <input type="password" name="verifyPassword"></input>
          </form> 
          
          <Link to="/login">
          <div className="already-registered">Already Registered?</div>
          </Link>



        </div>
      )
}


export default Registration;