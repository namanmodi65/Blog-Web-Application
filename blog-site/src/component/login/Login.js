import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './Login.css'

function Login() {

  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching, user } = useContext(Context)


  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" })
    }

  }
  console.log(user)

  return (
    <div className='login'>
      <div className="center">
        <input type="checkbox" id="show" />
        <label for="show" className="show-btn">View Form</label>
        <div className="container">
          <label for="show" className="close-btn fas fa-times" title="close"></label>
          <div className="text">
            Login
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="data">
              <label>Username</label>
              <input type="text" required ref={userRef} />
            </div>
            <div className="data">
              <label>Password</label>
              <input type="password" required ref={passwordRef} />
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit" disabled={isFetching} >login</button>
            </div>
            <div className="signup-link">
              Do not have an account? <Link to="/resister">Resister</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login