import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import axios from 'axios';
import SideBar from './SideBar';
import  {Link} from 'react-router-dom'
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import {fetchCategories} from '../Redux-toolkit/Slice'

function Dashboard() {
    const [Auth,setAuth] = useState(false);
    const navigate = useNavigate();
    const categories = useSelector((state) => state.Data.Categories);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCategories())
        axios.get("/api/CheckAuth").then(res=> {
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
           navigate("/Admin")
         }
         
         return Promise.reject(err)
    })

    axios.interceptors.response.use(function(response){
        return response;
    },function(error){
       if(error.response.status==403){
        swal("Forbidden",error.response.data.message,"warning");
        navigate("/Admin")
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
    <SideBar/>
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
             <h4>CATEGORIES</h4>
             <h3>{categories.length}</h3>
           </div>
           <div class="view">
           <Link to="/Admin/Category">View All</Link>
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

export default Dashboard

const Content = styled.div`
   background-color:#e5e5e5;
   height:100vh;  
   padding:30px;
   .content{
     background-color:#fff;
     border-radius:7px;
  }
`