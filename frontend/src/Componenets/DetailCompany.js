import React,{useEffect,useMemo} from 'react'
import { useParams } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import company1 from '../Componenets/images/company-1.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {fetchEmployers} from './Redux-toolkit/Slice'
import { useDispatch, useSelector } from 'react-redux';

function DetailCompany() {
    const {id} = useParams();
    const Employers = useSelector((state) => state.Data.Employers);
    const dispatch = useDispatch();
    
    const filterEmployers = useMemo(
      () => Employers.filter((item) => item.id == id),
      [Employers]
    )

    useEffect(() => {
       dispatch(fetchEmployers());
    },[])


  return (
    <div>
        <Header/>
        {filterEmployers.map(item => (
        <>
        <div className='AboutCompany mb-2 d-flex align-items-center'>
            <div className='row ps-4 align-items-center w-100'>
                <div className='col-sm-6 col-md-10'>
                    <div className='row'>
                     <div className='col-sm-6 col-md-1 me-3'>
                        <img src={`http://localhost:8000/${item.logo}`} style={{width:"100px"}} className="rounded-circle" />                      
                      </div>
                        <div className='col-sm-6 col-md-9'>
                            <h3>{item.Name}</h3>
                            <ul className='InfoJob mb-2 nav gap-4'>
                        <li className=''>
                            <BusinessCenterIcon/> 
                            {item.Categories}
                        </li>
                        <li>
                            <LocationOnIcon/>
                            {item.Country},{item.Location}
                        </li>
                        <li>
                        <PhoneIcon/>
                        {item.Phone}
                        </li>
                        <li>
                            <EmailIcon/>
                           {item.email}
                        </li>
                       </ul>
                    </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-2'>
                    <button className='btn btn-primary'>Private Message</button>
                </div>
            </div>
        </div>
        <div className='AboutCom p-3'>
            <div className='row'>
                <div className='col-sm-6 col-md-8 mb-3'>
                    <h3>About Company</h3>
                    <p className='mb-3'>
                        {item.AboutCompany}
                </p>
                {/* <div className='row mb-3'>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                        <img src={employer1} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                        <img src={employer2} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                       <img src={employer3} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                      <img src={employer4} />
                    </div>
                </div> */}
               <div className='relatedJobs'>
                    <h2>Related jobs</h2>
                    {item.jobs.length > 0 ? item.jobs.map(it => (
                      <div className='mb-3'>
                      <div className='border border-3 border-solid p-3'>
                     <div className='logoCompany mb-3'>
                        <img src={`http://localhost:8000/${item.logo}`} style={{width:"130px"}} className="rounded-circle" />
                     </div>
                     <div className='job'>
                       <h4 className='mb-2'>{it.Job}</h4>
                       <ul className='InfoJob mb-2 nav gap-4'>
                           <li className=''>
                               <BusinessCenterIcon/> 
                               {item.Name}
                           </li>
                           <li>
                               <LocationOnIcon/>
                               {item.Country},{item.Location}
                           </li>
                           <li>
                               <QueryBuilderIcon/>
                               11 hours ago
                           </li>
                           <li>
                               <AttachMoneyIcon/>
                                {it.Salary}
                               </li>
                       </ul>
                       <ul className='OtherInfoJb nav gap-4'>
                           <li className='type p-1 pe-3 ps-3'>
       
                               {it.Type}
                           </li>
                           <li className='urgent p-1 pe-3 ps-3'>
                               {it.Status}
                           </li>
                       </ul>
                     </div>
                      </div>
                      </div>
                    )) : <div>There no Jobs to this Company</div>}
             
               
                </div>
                </div>
               
                <div className='col-sm-6 col-md-4'>
                    <ul className='infoCom p-3'>
                        <li><strong>Industry: </strong>{item.Indusrty}</li>
                        <li><strong>Company size: </strong>{item.CompanySize}</li>
                        <li><strong>Founded in: </strong>{item.Founded}</li>
                        <li><strong>Phone: </strong>{item.Phone}</li>
                        <li><strong>Email: </strong>{item.email}</li>
                        <li><strong>Location: </strong>{item.Country}, {item.Location}</li>
                        <li><a href='' className='nav-link'>{item.WebSite}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        </>
        ))}

        <Footer/>
    </div>
  )
}

export default DetailCompany