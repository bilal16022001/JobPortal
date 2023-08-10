import React, { useEffect, useState } from 'react'
import SideBar_E from './SideBar_E'
import styled from 'styled-components'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router'
import swal from 'sweetalert';

function DetailJob() {
    const [Job,setJob]=useState([]);
    const [Auth,setAuth] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    console.log("yes this")
    useEffect(() => {
        // axios.get(`/api/Job/${id}`).then(res => {
        //    console.log(res.data);
        //    setJob(res.data);
        // }).catch(err => {
        //    console.log(err);
        // })
        // axios.get("/api/CheckEmployer").then(res=> {
        //     if(res.data.status == 200){
        //       console.log(res.data.message);
        //      setAuth(true)
        //      }else{
        //       setAuth(false)
        //      }
        //   })
      
        // return () => {
        //    setAuth(false);
        // }
    },[]);
    // axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    //     if(err.response.status==401){
    //        swal("Unauthorized",err.response.data.message,"warning")
    //        navigate("/login")
    //      }
         
    //      return Promise.reject(err)
    // })
    
    // axios.interceptors.response.use(function(response){
    //     return response;
    // },function(error){
    //    if(error.response.status==403){
    //     swal("Forbidden",error.response.data.message,"warning");
    //     navigate("/login")
    //     }
    //     else if(error.response.status==404){
    //         swal("404 Error","page not found","warning");
    //         navigate("/login")
    //     }
    //     return Promise.reject(error)
    //  }
    
    // )
  return (
    <div>
    <div className='d-flex'>
    <SideBar_E/>
    <div className='w-100'>
    <Content className=''>
  <div className='content'>
  <div class="parent p-3">
  <div className='AboutCompany mb-2 d-flex align-items-center'>
            <div className='row ps-4 align-items-center w-100'>
                <div className='col-sm-6 col-md-12'>
                    <div className='row'>
                        <div className='col-sm-6 col-md-2'>
                            <img src={`http://localhost:8000/${Job?.company?.logo}`} />
                        </div>
                        <div className='col-sm-6 col-md-10'>
                            <h3>{Job.Job}</h3>
                            <ul className='InfoJob mb-2 nav gap-4'>
                        <li className=''>
                            <BusinessCenterIcon/> 
                            {Job?.company?.Name}
                        </li>
                        <li>
                            <LocationOnIcon/>
                            {Job.Location}
                        </li>
                        <li>
                        <AccessTimeIcon/>
                        1 hour 
                        </li>
                        <li>
                            <MonetizationOnIcon/>
                            {Job.Salary}
                        </li>
                    </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='AboutCom p-3'>
            <div className='row'>
                <div className='col-sm-6 col-md-8 mb-3'>
                    <h2 className='mb-3'>Requirment Job</h2>
                    <div className=''>
                        <h4>Job Description</h4>
                        <p>{Job.Description}</p>
                        <h4>Key Responsibilities</h4>
                         <ul>
                         {Job.Responsibilities?.split(",").map(item => (
                           <li>{item}</li>
                         ))}
                         </ul>
                        <h4>Skill & Experience</h4>
                        <ul>
                         {Job.Skills?.split(",").map(item => (
                           <li>{item}</li>
                         ))}
                         </ul>
                    </div>
              
                </div>
               
                <div className='col-sm-6 col-md-4'>
                    <ul className='infoCom p-3'>
                        <h3>Job Overview</h3>
                        <li><strong>Date Posted: </strong>1 hour</li>
                        <li><strong>Expiration date: </strong>{Job.Expired_Date}</li>
                        <li><strong>Location: </strong>{Job.Location}</li>
                        <li><strong>Job Title: </strong>{Job.Job}</li>
                        <li><strong>Hours: </strong>{Job.Hours}</li>
                        <li><strong>Rate: </strong>{Job.Rate}</li>
                        <li><strong>Salary: </strong>{Job.Salary}</li>
                    </ul>
                    {/* <ul className='infoCom p-3'>
                        <li><strong>Industry: </strong>{Job?.company?.Indusrty}</li>
                        <li><strong>Company size: </strong>{Job?.company?.Indusrty}</li>
                        <li><strong>Founded in: </strong>{Job?.company?.Founded}</li>
                        <li><strong>Phone: </strong>{Job?.company?.Phone}</li>
                        <li><strong>Email: </strong>{Job?.company?.Email}</li>
                        <li><strong>Location: </strong>{Job?.company?.Location}</li>
                        <li><a href='' className='nav-link website'>{Job?.company?.WebSite}</a></li>
                    </ul> */}
                </div>
                
            </div>
        </div>
</div>


</div>


   </Content>

    </div>
</div>
   </div>
  )
}

export default DetailJob

const Content = styled.div`
     background-color:#e5e5e5; 
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
       textarea{
         height:150px;
      }
      img{
        width:100px;
        border-radius:50%;
      }
     
    }
`
