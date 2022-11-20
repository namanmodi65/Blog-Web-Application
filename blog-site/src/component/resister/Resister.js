import axios from 'axios'
import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function Resister() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleResister = async(e)=>{
    e.preventDefault()
    setError(false)
    try {
      const res =await axios.post('http://localhost:3001/api/auth/resister',{
        username
        ,email
        ,password
      })
      res.data && window.location.replace("/login")
    } catch (error) {
        setError(true)
    }

  }

  return (
    <div className='login'>
      <div class="center">
        <input type="checkbox" id="show" />
        <label for="show" class="show-btn">View Form</label>
        <div class="container">
          <label for="show" class="close-btn fas fa-times" title="close"></label>
          <div class="text">
            Resister
          </div>
          <form onSubmit={handleResister}>
          <div class="data">
              <label>Email</label>
              <input type="email" required onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div class="data">
              <label>Username</label>
              <input type="text" required onChange={(e)=> setUsername(e.target.value)} />
            </div>
            <div class="data">
              <label>Password</label>
              <input type="password" required onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div class="btn">
              <div class="inner"></div>
              <button type="submit" >Resister</button>
            </div>
            <div class="signup-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <div  class="signup-link">
              {error && <span style={{color:"red"}}>Something went wrong !</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Resister