import React, {  } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css'

function Login() {


     return (
        <div className="loginForm">
          <h1>Login</h1>
          <form>
            <div></div>
            <input type="email" placeholder="Enter Email" name="email"></input>
            <div></div>
            <input type="password" placeholder="Enter Password" name="password"></input>
          </form> 
          <Link to="/registration">
          <div className="not-registered">Not Registered?</div>
          </Link>



        </div>
      )
}


export default Login;