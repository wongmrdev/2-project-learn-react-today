import React, { } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css'
import {} from 'uuid/v4'

function Registration() {


     return (
        <div className="loginForm">
          <h1>Registration</h1>
          
          <form>
           
            <input type="email" placeholder="Enter email" name="email"></input>
            
            <input type="password" placeholder="Enter password" name="password"></input>
            
            <input type="password" placeholder="Re-enter password"  name="verifyPassword"></input>
          </form> 
          
          <Link to="/login">
          <div className="already-registered">Already Registered?</div>
          </Link>



        </div>
      )
}


export default Registration;