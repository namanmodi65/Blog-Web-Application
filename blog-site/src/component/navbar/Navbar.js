import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './Navbar.css'

function Navbar() {
  const PF = "http://localhost:3001/images/"
  const {user,dispatch} = useContext(Context)

  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  }

  return (
    <>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            Blog
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div class="nav-links">
          {user && <Link to="/about">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>}
          <Link to="/">Home</Link>
          <Link to="/about" >About me</Link>
          <Link to="/write" >Write</Link>
          <Link to="/setting">Settings</Link>
          {!user && <Link to="/login" >Login</Link>}
          {!user && <Link to="/resister" >Resister</Link>}
          {user &&<Link onClick={handleLogout} >Logout</Link>}
        </div>
      </div>
    </>
  )
}

export default Navbar