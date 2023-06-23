import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import {useNavigate} from 'react-router'
import axios from 'axios'
import swal from 'sweetalert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from 'react-router-dom'

function Candidates() {
    const [Auth,setAuth]=useState(false);
    const [candidates,setCandidates]=useState([]);

    const navigate = useNavigate();
      useEffect(() => {
        fetchUsers();
        axios.get("/api/CheckAuth").then(res=> {
          if(res.data.status == 200){
            setAuth(true)
           }else{
            setAuth(false)
           }
       })
  
      return () => {
         setAuth(false);
      }
      },[])

      const fetchUsers = () => {
         axios.get("api/Users").then(res => {
              console.log(res.data);
              setCandidates(res.data);
        }).catch(err => {
           console.log(err);
        })
      }
      const DeleteCandidate = (id) => {
    
        swal({
          title: "Are you sure To Delete This Candidate?",
          text: "Once deleted, you will not be able to recover this Candidate !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
          
              axios.delete(`/api/Users/${id}`).then(res => {
                fetchUsers();
                if(res.data.status == 200){
                  swal("Poof! Candidate has been deleted!", {
                    icon: "success",
                  })
                }
              }).catch(err => {
                 console.log(err);
              })
          
           
          } else {
            swal("Candidate  is safe!");
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
            swal("404 Error","page not found","warning");
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
<h2 class="text-center mb-4">Manage Candidates</h2>
<div class="">
    <div class="table-responsive">
        <table class="main-table text-center table table-bordered">
             <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Phone</td>
                  <td>Gender</td>
                  <td>Action</td>
            </tr>
           {candidates.length > 0 && <>
              {candidates.map(item => (
                   <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Phone}</td>
                      <td>{item.Gender}</td>
                      <td>
                          <Link to={`/Admin/Candidate/${item.id}`}><VisibilityIcon/></Link>
                          <a onClick={()=>DeleteCandidate(item.id)} href='#'><DeleteIcon/></a>
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

export default Candidates

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