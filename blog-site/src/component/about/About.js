import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './About.css'

function About() {
  const PF = "http://localhost:3001/images/"
  const {user} = useContext(Context)
  return (
    <div className='about-container'>
      <div className='about-image'>
        <img className="about-topImg" src={PF+user.profilePic} alt="" />
      </div>
      <div className='about-intro'>
        <span>I'm </span>
        <Link to={`/?user=${user.username}`} style={{ textDecoration: 'none',color:'black' }}>
        <p>{user.username}</p>
        </Link>
        <span>How to reach me</span>
        <p>{user.email}</p>
      </div>
    </div>
  )
}

export default About