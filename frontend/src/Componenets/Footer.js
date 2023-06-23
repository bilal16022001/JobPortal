import React from 'react'
import footerImg from '../Componenets/images/3.png'

function Footer() {
  return (
    <div className='footer p-4'>
        <div className='container'>
            <div className='newsletter text-center mb-5'>
                <h2 className='mb-2'>Subscribe Our Newsletter</h2>
                <p className='mb-4'>We don’t send spam so don’t worry.</p>
                <input type="email" placeholder='Your Email' />
                <input type="submit" value="SubScribe" />
            </div>
            <div className='row'>
                <div className='col-sm-6 col-md-3'>
                    <ul className='navbar navbar-nav'>
                        <h3>Job Portal</h3>
                        <li className=''>Phone: +1234566</li>
                        <li>Adress: newYork</li>
                        <li>Email: eemple@gmail.com</li>
                    </ul>
                </div>
                <div className='col-sm-6 col-md-3'>
                    <ul className='navbar navbar-nav'>
                        <h3>For Candidates</h3>
                        <li>Browse Jobs</li>
                        <li>Browse Categories</li>
                    </ul>
                </div>
                <div className='col-sm-6 col-md-3'>
                    <ul className='navbar navbar-nav'>
                        <h3>For Employers</h3>
                        <li>Browse Candidates</li>
                        <li>Post Job</li>
                    </ul>
                </div>
                <div className='col-sm-6 col-md-3'>
                    <ul className='navbar navbar-nav'>
                        <h3>About</h3>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Footer