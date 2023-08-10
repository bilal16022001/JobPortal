import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Header from './Header'
import {fetchJobs} from './Redux-toolkit/Slice'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import swal from 'sweetalert'


function JobDetail() {

  const {id} = useParams();
  const jobs = useSelector((state) => state.Data.Jobs);
  const dispatch = useDispatch();
console.log("Jobs",jobs);
  const [userId,setUserId]=useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchJobs())

    axios.get("/api/CheckCnadidate").then(res=> {
        if(res.data.status == 200){
          console.log(res.data.message);
          setUserId(res.data.user.id)
        }
      })

  },[])



const handlSubmit = (e)=>{
    e.preventDefault();
   if(localStorage.getItem("auth_token") && localStorage.getItem("role_user")){
           console.log("rak dayr login");
           const data = {
              Job_id:id
           }
           axios.post("/api/ApplyJob",data).then(res => {
                 if(res.data.Status==200){
                   swal(res.data.message,"","success");
                 }
            }).catch(err => {
               console.log(err);
            })
   }else{
       console.log("khsk der login");
       navigate("/login");
    }
}


  return (
    <div>
      <Header/>
      <div>
      {jobs.filter(it => it.id==id ).map(item => (
        <>
        <div className='AboutCompany mb-2 d-flex align-items-center'>
            <div className='row ps-4 align-items-center w-100'>
                <div className='col-sm-6 col-md-10'>
                    <div className='row'>
                     <div className='col-sm-6 col-md-1 me-3'>
                        <img src={`http://localhost:8000/${item.company.logo}`} style={{width:"100px"}} className="rounded-circle" />                      
                      </div>
                        <div className='col-sm-6 col-md-9'>
                            <h3>{item.Job}</h3>
                            <ul className='InfoJob mb-2 nav gap-4'>
                        <li className=''>
                            <BusinessCenterIcon/> 
                            {item.company.Name}
                        </li>
                        <li>
                            <LocationOnIcon/>
                            {item.company.Country},{item.company.Location}
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
                    </div>
                    </div>
                </div>
               
                <div className='col-sm-6 col-md-2'>
        
                { item.application.filter(i => i.Job_id==id && i.User_id == userId).length > 0 ? <button type="button" class="btn btn-primary" disabled>You Applied this Job</button> : <button type="button" class="btn btn-primary" onClick={handlSubmit}>Apply</button>}
               
                </div>
            </div>
        </div>
        <div className='AboutCom p-3'>
            <div className='row'>
                <div className='col-sm-6 col-md-8 mb-3'>
                    <h3>Description</h3>
                    <p className='mb-3'>
                        {item.Description}
                   </p>
                   <h3>Responsablilites</h3>
                  
                    {item.Responsibilities.split(",").map(it => (
                     <li>{it}</li>
                    ))}
             
                   <h3>Experience</h3>
                   {item.Experience.split(",").map(it => (
                     <li>{it}</li>
                    ))}
             
               <div className='relatedJobs'>
                    <h2>Related jobs</h2>
            
                    {jobs.filter(it => it.id!=id && it.Company_id==item.company.id).length > 0 ? jobs.filter(it => it.id!=id && it.Company_id==item.company.id).map(it => (
                      <div className='mb-3'>
                      <div className='border border-3 border-solid p-3'>
                     <div className='logoCompany mb-3'>
                        <img src={`http://localhost:8000/${item.company.logo}`} style={{width:"130px"}} className="rounded-circle" />
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
                        <li>
                            <div className='row'>
                                <div className='col-md-6'>
                                <img src={`http://localhost:8000/${item.company.logo}`} style={{width:"100px"}} className="rounded-circle" />

                                </div>
                                <div className='col-md-6'>
                                     <h4>{item.company.Name}</h4>
                                     <a href='' className='nav-link'>{item.company.WebSite}</a>
                                </div>
                            </div>
                        </li>
                        <li><strong>Industry: </strong>{item.company.Indusrty}</li>
                        <li><strong>Company size: </strong>{item.company.CompanySize}</li>
                        <li><strong>Founded in: </strong>{item.company.Founded}</li>
                        <li><strong>Phone: </strong>{item.company.Phone}</li>
                        <li><strong>Email: </strong>{item.company.email}</li>
                        <li><strong>Location: </strong>{item.Country}, {item.Location}</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
        ))}
      </div>
      <Footer/>

    </div>
  )
}

export default JobDetail