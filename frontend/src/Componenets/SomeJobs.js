import React,{useEffect} from 'react'
import logoCom from './images/logoC.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';
import {fetchJobs} from './Redux-toolkit/Slice'
import { useDispatch, useSelector } from 'react-redux';

function SomeJobs() {

    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.Data.Jobs);
    useEffect(() => {
    dispatch(fetchJobs())
    },[])

  return (
    <div className='mb-5'>
       <div className='text-center mb-5'>
          <h1>Featured Jobs</h1>
          <p>Know your worth and find the job that qualify your life</p>
       </div>
       <div className='jobs row'>
        {jobs.length > 0 ? jobs.map(item => (
            <div className='col-md-4 col-sm-6 mb-3'>
              <div className='logoCompany mb-3'>
              <img src={`http://localhost:8000/${item.company.logo}`} style={{width:"100px"}} className="rounded-circle" />                      
              </div>
              <div className='job'>
                <h4 className='mb-2'><Link className='nav-link mb-2' to={`/Job/${item.id}`}>{item.Job}</Link></h4>
                
                <ul className='InfoJob mb-2 nav gap-4'>
                    <li className=''>
                        <BusinessCenterIcon/> 
                        {item.company.Name} 
                    </li>
                    <li>
                        <LocationOnIcon/>
                        {item.company.Country}, {item.company.Location}
                    </li>
                    <li>
                        <QueryBuilderIcon/>
                        11 hours ago
                    </li>
                    <li>
                        <AttachMoneyIcon/>
                        {item.Salary}
                    </li>
                </ul>
                <ul className='OtherInfoJb nav gap-4'>
                    <li className='type p-1 pe-3 ps-3'>

                        {item.Status}
                    </li>
                    <li className='urgent p-1 pe-3 ps-3'>
                        {item.Type}
                    </li>
                </ul>
              </div>
           </div>
        )) : <div>There is no jobs</div>}
           
           <Link to="/jobs" className='tex-center'>More Jobs</Link>
       </div>
    </div>
  )
}

export default SomeJobs