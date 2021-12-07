import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../css/app.css'
import { setBackendUrl } from '../../config.js'
import { RecipeContext } from '../App'
function VerifyEmail(props) {
  // passed state into Redirect Object location.state console.log(props.location.state.email)
  const email = props.location.state.email
  let backendUrl = setBackendUrl()
  const [errorMessage, setErrorMessage] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailVerificationForm, setEmailVerificationForm] = useState({ email: email, verificationCode: '' })
  const { isAuthenticated, setIsAuthenticated } = useContext(RecipeContext)

  console.log(emailVerificationForm)

  function handleChange(changes) {
    setEmailVerificationForm({ ...emailVerificationForm, ...changes })
  }

  async function handleEmailVerificationFormSubmit(event) {
    setIsSubmitting(true)
    console.log(`backendurl: ${backendUrl}`)


    //check the data
    if (emailVerificationForm.value === '') {
      return alert('value is required')
    }

    const response = () => {
      return fetch(`${backendUrl}/api/v1/users/verification-code`, {
        credentials: "include",
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailVerificationForm),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          localStorage.setItem("isLoggedIn", data.success)
          if (data.success === true) {
            setIsAuthenticated(true)
            alert("email verified, please login again")
          } else {
            setErrorMessage(data.message)
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert("something went wrong with email code")
        });

    }
    response()
    setIsSubmitting(false)
    event.preventDefault()
  }


  return (
    !isAuthenticated ? (

      <div className="loginForm">
        <h3>Enter Code from Verification Email</h3>
        <p>client email: {emailVerificationForm.email}</p>
        {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}
        <form onSubmit={(event) => handleEmailVerificationFormSubmit(event)}>
          <div></div>
          <label htmlFor="value"></label>
          <input
            type="number"
            placeholder="Enter code"
            name="verificationCode"
            required
            value={emailVerificationForm.value}
            onChange={event => handleChange({ verificationCode: event.target.value })}
          />
          <div>
            <button
              type="submit"
              className="btn btn--primary btn--submit"
              disabled={isSubmitting}>
              submit
            </button>
          </div>
          <Link to="/login">
            <div className="btn btn--danger btn--cancel">cancel</div>
          </Link>

        </form>


      </div>
    ) : <Redirect to='/home' />
  )
}


export default VerifyEmail;