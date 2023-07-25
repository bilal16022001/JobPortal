import React,{useEffect} from 'react'
import Header from './Header'
import logoCom from './images/logoC.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Footer from './Footer'
import {fetchJobs} from './Redux-toolkit/Slice'
import { useDispatch, useSelector } from 'react-redux';

function AllJobs() {
    
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.Data.Jobs);
    useEffect(() => {
    dispatch(fetchJobs())
    },[])

  return (
    <div>
        <Header/>
        <div className='container p-4 Alljobs'>
            <div className='row'>
               <div className='col-sm-6 col-md-4 mb-3'>
                   <div className='sideBar p-4'>
                       <div className='jobTitle'>
                          <h3>Job Title</h3>
                          <input type="text" className='form-control' placeholder='Job Title' />
                       </div>
                       <div className='location'>
                          <h3>Location</h3>
                          <input type="text" className='form-control' placeholder='Location' />
                       </div>
                       <div className='category'>
                          <h3>Category</h3>
                          <select className='form-control'>
                              <option>test</option>
                              <option>test</option>
                              <option>test</option>
                              <option>test</option>
                          </select>
                       </div>
                       <div className='jobType'>
                        
                       <h3>Job type</h3>
                       <form>
                         <ul className='navbar-nav'>    
                                <li><input type="checkbox"/> Freelancer</li>
                                <li><input type="checkbox"/> full-time</li>
                                <li><input type="checkbox"/> part-time</li>
                                <li><input type="checkbox"/> contract</li>  
                          </ul>
                          </form>
                       </div>
                       <div className='jobType'>
                       <h3>Date Posted</h3>
                          <select className='form-control'>
                              <option>Any Time</option>
                              <option>Past week</option>
                              <option>Past 24 hours</option>
                              <option>Past month</option>
                          </select>
                       </div>
                       <div className='levels'>
                       <h3>Experince level</h3>
                            <form>
                                <ul className='navbar-nav'>
                                    <li className=''><input type="checkbox"/> all</li>
                                    <li><input type="checkbox"/> intern</li>
                                    <li><input type="checkbox"/> Entry level</li>
                                </ul>
                             </form>
                       </div>
                       <div className='salary'>
                      <h3>Salary</h3>
                      <select className='form-control'>
                          <option>All</option>
                          <option>+$1000</option>
                          <option>+$5000</option>
                          <option>+$7000</option>
                          <option>+$9000</option>

                      </select>
                   </div>
                   </div>
               </div>
               <div className='col-sm-6 col-md-8 mb-3'>
                   <div className='row'>
                    
        {jobs.length > 0 ? jobs.map(item => (
            <div className='col-sm-6 col-md-6 mb-3'>
              <div className='logoCompany mb-3'>
              <img src={`http://localhost:8000/${item.company.logo}`} style={{width:"100px"}} className="rounded-circle" />                      
              </div>
              <div className='job'>
                <h4 className='mb-2'>{item.Job}</h4>
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
                
                   </div>
               </div>
               
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AllJobs