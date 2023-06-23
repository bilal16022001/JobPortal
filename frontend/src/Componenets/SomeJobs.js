import React from 'react'
import logoCom from './images/logoC.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';

function SomeJobs() {
  return (
    <div className='mb-5'>
       <div className='text-center mb-5'>
          <h1>Featured Jobs</h1>
          <p>Know your worth and find the job that qualify your life</p>
       </div>
       <div className='jobs row'>
           <div className='col-md-4 col-sm-6 mb-3'>
              <div className='logoCompany mb-3'>
                 <img src={logoCom} />
              </div>
              <div className='job'>
                <h4 className='mb-2'>Software Engineer (Android), Libraries</h4>
                <ul className='InfoJob mb-2 nav gap-4'>
                    <li className=''>
                        <BusinessCenterIcon/> 
                        Upwork
                    </li>
                    <li>
                        <LocationOnIcon/>
                        London, UK
                    </li>
                    <li>
                        <QueryBuilderIcon/>
                        11 hours ago
                    </li>
                    <li>
                        <AttachMoneyIcon/>
                        $35k - $45k
                    </li>
                </ul>
                <ul className='OtherInfoJb nav gap-4'>
                    <li className='type p-1 pe-3 ps-3'>

                        Full-Time
                    </li>
                    <li className='urgent p-1 pe-3 ps-3'>
                        Urgent
                    </li>
                </ul>
              </div>
           </div>
           <Link to="/jobs" className='tex-center'>More Jobs</Link>
       </div>
    </div>
  )
}

export default SomeJobs