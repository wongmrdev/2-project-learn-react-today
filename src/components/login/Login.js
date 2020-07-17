import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import '../../css/app.css'
import uuidv4 from 'uuid/v4'

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