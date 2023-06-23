import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import axios from 'axios'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'

function Employers() {
  const [Employers,setEmployers]=useState([]);
  const [Auth,setAuth]=useState(false);
  const navigate = useNavigate();
    useEffect(() => {
      getEmployers()
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

    const getEmployers = () => {
      axios.get("api/Employers").then(res => {
        console.log(res.data);
        setEmployers(res.data)
        }).catch(err => {
          console.log(err);
        });
    }

    const DeleteEmployer = (id) => {
    
      swal({
        title: "Are you sure To Delete This Emplyoer?",
        text: "Once deleted, you will not be able to recover this Emplyoer !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
        
            axios.delete(`/api/Employers/${id}`).then(res => {
               getEmployers()
              if(res.data.status == 200){
                swal("Poof! Emplyoer has been deleted!", {
                  icon: "success",
                })
              }
            }).catch(err => {
               console.log(err);
            })
        
         
        } else {
          swal("Emplyoer  is safe!");
        }
      });
  }
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
        navigate("/Admin")
    }
    return Promise.reject(error)
 }

)
  return (
    <div>
        <div className='d-flex'>
        <SideBar/>
        <div className='w-100'>
        <Content className=''>
    <div className='content'>
      <div class="parent p-3">
    <h2 class="text-center mb-4">Manage Employers</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Phone</td>
                      <td>Email</td>
                      <td>Adress</td>
                      <td>Action</td>
                </tr>
               {Employers.length > 0 && <>
                  {Employers.map(item => (
                       <tr>
                          <td>{item.id}</td>
                          <td>{item.Name}</td>
                          <td>{item.Phone}</td>
                          <td>{item.email}</td>
                          <td>{item.Address}</td>
                          <td>
                              <Link to={`/Admin/Employer/${item.id}`}><VisibilityIcon/></Link>
                              <a onClick={()=>DeleteEmployer(item.id)} href='#'><DeleteIcon/></a>
                          </td>
                       </tr>
                       
                  ))}
               </>}
      
      
          </table>
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

export default Employers

const Content = styled.div`
     background-color:#e5e5e5;
     height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
       textarea{
         height:150px;
      }
    }
`