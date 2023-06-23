import React, { useEffect } from 'react'
import SideBar_E from './SideBar_E'
import styled from 'styled-components'
import {fetchJobs} from '../Redux-toolkit/Slice'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'

function Jobs() {
    const jobs = useSelector((state) => state.Data.Jobs);
    const dispatch = useDispatch();
console.log("jobs",jobs);
    useEffect(() => {
      dispatch(fetchJobs());
    },[]);


    const DeleteJob = (id) => {
    
      swal({
        title: "Are you sure To Delete This Job?",
        text: "Once deleted, you will not be able to recover this Job !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
             axios.delete(`/api/Job/${id}`).then(res => {
                   if(res.data.status==200){
                    swal(res.data.message,"","success");
                  }
              }).catch(err => {
                 console.log(err);
              })
        
         
        } else {
          swal("Job  is safe!");
        }
      });
  }
  return (
    <div>
    <div className='d-flex'>
    <SideBar_E/>
    <div className='w-100'>
    <Content className=''>
<div className='content'>
  <div class="parent p-3">
<h2 class="text-center mb-4">Manage Jobs</h2>
<div class="">
    <div class="table-responsive">
        <table class="main-table  table table-bordered">
           {jobs.length > 0 ? <tr>
                  <td>#</td>
                  <td>Title</td>
                  <td>Category</td>
                  <td>Applications</td>
                  <td>Created & Expaired</td>
                  <td>Status</td>
                  <td>Action</td>
            </tr> : <h2>There is no jobs</h2>}  
              {jobs.map(item => (
                   <tr>
                      <td>{item.id}</td>
                      <td>{item.Job}</td>
                      <td>{item.category.Name}</td>
                      <td>0</td>
                      <td>{item?.created_at?.slice(0,10)},{item.Expired_Date}</td>
                      <td>{item.Status}</td>
                      <td>
                          <Link to={`/Employer/Job/${item.id}`}><VisibilityIcon/></Link>
                          <Link to={`/Employer/Edit/${item.id}`}><EditIcon/></Link>
                          <a onClick={() => DeleteJob(item.id)} href='#'><DeleteIcon/></a>
                      </td>
                   </tr>
                   
              ))}
  
  
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

export default Jobs

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