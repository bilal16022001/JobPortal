import React, { useEffect, useState } from 'react'
import SideBar_E from './SideBar_E'
import styled from 'styled-components'
import {fetchApplications} from '../Redux-toolkit/Slice'
import { useSelector,useDispatch } from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import swal from 'sweetalert';
import axios from 'axios'
import { useNavigate } from 'react-router'

function ShortListed() {

  const Applications = useSelector((state) => state.Data.Applications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [check,setCheck]=useState(null);

  useEffect(() => {
     dispatch(fetchApplications())
  },[]);

  const AcceptCandidate = (id) => {
     swal({
         title: "Are you sure To Approve This Jober ?",
         text: "Once Approve, you will not be able to recover this Approve !",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then((willDelete) => {
         if (willDelete) {
          const data = new FormData();
                data.append("check",1);
                data.append("_method","PATCH");

               axios.post(`/api/Applications/${id}`,data).then(res => {
                  if(res.data.status == 200){
                    swal("Poof! this jober has been Approeved!","","success");
                      dispatch(fetchApplications());
                  }
                  console.log(res.data);
               }).catch(err => {
                  console.log(err);
               })
         
          
         } else {
           swal("Approve  is safe!");
         }
       });
  }
  const RejectedCandidate = (id) => {
    swal({
        title: "Are you sure To Rejecte This Jober ?",
        text: "Once Rejecte, you will not be able to recover this Reject !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
         const data = new FormData();
               data.append("check",3);
               data.append("_method","PATCH");

              axios.post(`/api/Applications/${id}`,data).then(res => {
                 if(res.data.status == 200){
                   swal("Poof! this jober has been Rejected!","","success");
                     dispatch(fetchApplications());
                 }
                 console.log(res.data);
              }).catch(err => {
                 console.log(err);
              })
        
         
        } else {
          swal("Reject is safe!");
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
<h2 class="text-center mb-4">ShortListed Jobers</h2>
<div class="">
    <div class="table-responsive">
        <table class="main-table text-center table table-bordered">
        {Applications.filter(item => item.Status==1).length > 0 ?
             <tr>
                  <td>#</td>
                  <td>Name Jober</td>
                  <td>Job</td>
                  <td>Location</td>
                  <td>Status</td>
                  <td>Action</td>
            </tr>: <div className='alert alert-info text-left'>There is No ShortListed Jobers</div>}
              {Applications.filter(it => it.Status == 1).map(item => (
                   <tr>
                      <td>{item.id}</td>
                      <td>{item?.user?.Name}</td>
                      <td>{item?.job?.Job}</td>
                      <td>{item?.job?.Location}</td>
                      <td>{item.Status == 0 ? "Pending" : item.Status == 1 ? "Approved" : "Rejected"}</td>
                      <td>
                          <a  href='#' data-bs-toggle="modal" data-bs-target={`#show${item.id}`}><VisibilityIcon/></a>
                      </td>
            <div class="modal fade" id={`show${item.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Detail Application</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       <div class="row">
                          <div className='col-md-6'>
                             <img className='w-100 rounded-circle' src={`http://127.0.0.1:8000/${item?.user?.Profile}`} />
                          </div>
                          <div className='col-md-6'>
                              <ul className='navbar'>
                                <li className='nav-link'><span className=''>Name Jober</span> : {item?.user?.Name}</li>
                                <li className='nav-link'><span className=''>Job</span> : {item?.job?.Job}</li>
                                <li className='nav-link'><span className=''>Location</span> : {item?.job?.Location}</li>
                                <li className='nav-link'><span className=''>Phone</span> : {item?.user?.Phone}</li>
                                <li className='nav-link'><span className=''>Email</span> : {item?.user?.Email}</li>
                                <li className='nav-link'><span className=''>Type Job</span> : {item?.job?.Type}</li>
                                <li className='nav-link'><span className=''>Level</span> : {item?.job?.Level}</li>
                                <li className='nav-link'><span className=''>Rate</span> : {item?.job?.Rate}</li>
                                <li className='nav-link'><span className=''>Hours</span> : {item?.job?.Hours}</li>
                                <li className='nav-link'><span className=''>Salary Anneul</span> : {item?.job?.Salary}</li>
                          </ul>
                          </div>
                         
                       </div>
                    </div>
                    
                  </div>
                </div>
              </div>
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

export default ShortListed

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