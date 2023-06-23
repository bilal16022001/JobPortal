import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='parentHeader'>
    <nav class="Header navbar position-fixed w-100 navbar-expand-lg bg-light">
  <div class="container-fluid">
    <h3 class="navbar-brand"><Link className='nav-link' to='/'>Job Portal</Link></h3>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto  mb-2 mb-lg-0">
        
      </ul>
      <div class="d-flex">
      <ul class="navbar-nav me-auto  mb-2 mb-lg-0">
          <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/jobs'>Jobs</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/login'>login</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/Admin'>Admin</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/About'>About Us</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/Contact'>Contact Us</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/Blogs'>Blogs</Link></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
</div>
  )
}

export default Header