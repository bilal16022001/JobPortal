import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import axios from 'axios';
import  {Link} from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import {fetchJobs,fetchApplications} from '../Redux-toolkit/Slice'
import SideBar_E from './SideBar_E';


function Dashboard_E() {
    const [Auth,setAuth] = useState(false);
    const navigate = useNavigate();
    const jobs = useSelector((state) => state.Data.Jobs);
    const applications = useSelector((state) => state.Data.Applications);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(fetchJobs());
       dispatch(fetchApplications());
        axios.get("/api/CheckEmployer").then(res=> {
            if(res.data.status == 200){
              console.log(res.data.message);
              setAuth(true)
             }else{
              setAuth(false)
             }
         })
  
        return () => {
           setAuth(false);
        }
    },[])

    axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
        if(err.response.status==401){
           swal("Unauthorized",err.response.data.message,"warning")
           navigate("/login")
         }
         
         return Promise.reject(err)
    })

    axios.interceptors.response.use(function(response){
        return response;
    },function(error){
       if(error.response.status==403){
        swal("Forbidden",error.response.data.message,"warning");
        navigate("/login")
        }
        else if(error.response.status==404){
            swal("404 Error","page not f-ond","warning");
            navigate("/Page403")
        }
        return Promise.reject(error)
     }
    
    )
  return (
    <div>
         <div className='d-flex'>
    <SideBar_E/>
      <div className='w-100'>
        {/* <Header/> */}
        <Content className=''>
        <div className='content'>
            <div class="parent p-3">
            <div class="admin">
         <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>JOBS</h4>
             <h3>{jobs.length}</h3>
           </div>
           <div class="view">
           <Link to="/Employer/jobs">View All</Link>
           </div>
        </div>
        <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>APPLICATIONS</h4>
             <h3>{applications.length}</h3>
           </div>
           <div class="view">
           <Link to="/Employer/Applications">View All</Link>
           </div>
        </div>
        <div class="">
           <div class="con">
           <i class="fas fa-user"></i>
           </div>
           <div class="">
             <h4>SHORTLISTED JOBERS</h4>
             <h3>{applications.filter(it => it.Status==1).length}</h3>
           </div>
           <div class="view">
           <Link to="/Employer/ShortListed">View All</Link>
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

export default Dashboard_E

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`