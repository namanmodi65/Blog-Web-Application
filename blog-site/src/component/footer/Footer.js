import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'> 
        <img className='footer-image' src='blogIcon.png'></img>
        <p className='credit'>Build by <Link to="https://www.linkedin.com/in/naman-jain-932142219/">Naman jain</Link></p>
    </div>
  )
}

export default Footer