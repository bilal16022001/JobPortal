import React from 'react'
import company1 from '../Componenets/images/company-1.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

function Companies() {
  return (
    <div className='Companies p-5 mb-4'>
        <div className='container'>
            <h1 className='text-center mb-3'>Top Company Registered</h1>
            <p className='text-center mb-4'>Some of the companies we have helped recruit excellent applicants over the years.</p>
            <div className='allComp row text-center'>
            <div className='company col-sm-6 col-md-3'>
               <img className='mb-2' src={company1} />
               <a className='nav-link mb-2' href=''>Udemy</a>
              <span className='d-block mb-2'> <LocationOnIcon/> London</span>
               <Link className='nav-link mb-2' to={`/Company/1`}>20 Open Position</Link>
            </div>
            <div className='company col-sm-6 col-md-3'>
               <img className='mb-2' src={company1} />
               <a className='nav-link mb-2' href=''>Udemy</a>
               <span className='d-block mb-2'><LocationOnIcon/> London</span>
               <a className='nav-link' href=''>20 Open Position</a>
            </div>
            <div className='company col-sm-6 col-md-3'>
               <img className='mb-2' src={company1} />
               <a className='nav-link mb-2' href=''>Udemy</a>
               <span className='d-block mb-2'><LocationOnIcon/> London</span>
               <a className='nav-link' href=''>20 Open Position</a>
            </div>
            <div className='company col-sm-6 col-md-3'>
               <img className='mb-2' src={company1} />
               <a className='nav-link mb-2' href=''>Udemy</a>
               <span className='d-block mb-2'><LocationOnIcon/> London</span>
               <a className='nav-link' href=''>20 Open Position</a>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Companies