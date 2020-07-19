import React, {  } from 'react';
import { Link } from 'react-router-dom';
import '../../css/app.css'

function Login() {


     return (
        <div className="loginForm">
          <h1>Login</h1>
          <form>
            <div>Email</div>
            <input type="email" name="email"></input>
            <div>Password</div>
            <input type="password" name="password"></input>
          </form> 
          <Link to="/registration">
          <div className="not-registered">Not Registered?</div>
          </Link>



        </div>
      )
}


export default Login;