import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import crypto  from 'crypto'
import '../../css/app.css'
import { setBackendUrl } from '../../config.js'
import { RecipeContext } from '../App'

function Login() {
  let backendUrl = setBackendUrl()
  const {
    isAuthenticated,
    setIsAuthenticated
  } = useContext(RecipeContext)
  // function hashPassword(email, password) {
  //   let hash = crypto.createHash('sha256');
  //   hash.update(email+password);
  //   let hashedPassword = hash.digest('hex')
  //   return hashedPassword
  // }
  const [errorMessage, setErrorMessage] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginForm, setloginForm] = useState({
    email: '',
    password: ''
  })
  const [redirect, setRedirect] = useState('')
  function handleChange(changes) {
    setloginForm({ ...loginForm, ...changes })
  }

  function handleLoginFormSubmit(event) {
    setIsSubmitting(true)
    console.log(`backendurl: ${backendUrl}`)
    console.log(`is authenticated: ${isAuthenticated}`)
    //check the data
    if (loginForm.email === '') {
      return alert('email is required')
    } else if (loginForm.password === '') {
      return alert('password is required')
    }
    const response = async () => {
      return await fetch(`${backendUrl}/api/v1/users/login`, {
        credentials: "include",
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginForm }),
      })
    };

    response()
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success === false && data.hasOwnProperty("redirect") && data.redirect.hasOwnProperty("location") && data.redirect.hasOwnProperty("email") && data.redirect.email !== null && data.redirect.location !== null) {
          //redirect to verify-email and send the request to the email server to send email to client's email
          console.log("failure: ", data)
          requestEmailVerificationCodeFromServer(data.redirect)
          setIsAuthenticated(false)
          setRedirect(data.redirect.location.pathname)
          alert(`redirect to ${data.redirect.location.pathname}, ${data.message}`)
        } else if (data.success === true) {
          //Auth cookie will be set (httpOnly) only if data.success === true, we can now make requests back to the server with the cookie
          localStorage.setItem('isLoggedIn', 'true')
          setIsAuthenticated(true)

          console.log('Login response success:', data);
          console.log(`is authenticated: ${isAuthenticated}`)
        } else {
          setIsAuthenticated(false)
          setErrorMessage(data.message)
        }
      })
      .catch((error) => {
        console.error('response Error:', error);

        alert("something went wrong with login code")
      });


    setIsSubmitting(false)
    event.preventDefault()
  }

  //if email is not verified, send email to user
  async function requestEmailVerificationCodeFromServer(redirect) {
    fetch(backendUrl + '/api/v1/users/verify-email',
      {
        credentials: "include",
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: redirect.email }),
      }).then(res => {
        console.log('verify-email res: ', res.json())
      }).then(() => {
        console.log("Verification Code sent to your email on file")
      }).catch(
        err => { console.log(err) }
      )
  }


  return (

    (isAuthenticated) ? <Redirect to='/home' />
      : (!isAuthenticated && redirect) ? <Redirect to={{ pathname: redirect, state: { email: loginForm.email } }} /> : (

        <div className="loginForm">
          <h1>Login</h1>
          {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
          <form onSubmit={(event) => handleLoginFormSubmit(event)}>
            <div></div>
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              value={loginForm.email}
              onChange={event => handleChange({ email: event.target.value })}
            />
            <div></div>
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={loginForm.password}
              onChange={event => handleChange({ password: event.target.value })}
            />
            <div>
              <button
                type="submit"
                className="btn btn--primary btn--submit"
                disabled={isSubmitting}>
                Login
              </button>
            </div>

          </form>
          <Link to="/registration">
            <div className="not-registered">Not Registered?</div>
          </Link>

        </div>
      )

  )
}


export default Login;