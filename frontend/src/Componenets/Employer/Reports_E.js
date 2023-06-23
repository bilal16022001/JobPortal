import React,{useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {fetchApplications} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import SideBar_E from './SideBar_E';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Reports_E() {

    const [fromD,setformD]=useState("");
    const [ToD,setTod]=useState("");
    const [FromDate,setFromDate]=useState("");
    const [ToDate,setToDate]=useState("");
    const [status,setStatus]=useState(null);
    const [st,setSt]=useState("");

    const Applications = useSelector((state) => state.Data.Applications);

    const dispatch = useDispatch();
   
    dispatch(fetchApplications());

    const HandlReports = (e) => {
        e.preventDefault();  

        setformD(FromDate)
        setTod(ToDate);
        setStatus(st);

    }

  return (
    <div className='d-flex'>
    <SideBar_E/>
      <div className='w-100'>
        <Content className=''>
        <div className='content'>
            <div class="parent p-3">
               <h3>Report who give you Jobers by Status between two dates</h3>
               <form className='mb-3' onSubmit={HandlReports}>
                  <label className='mb-2'>From</label>
                  <input className='form-control mb-3' onChange={(e) => setFromDate(e.target.value)} type="date" required/>
                  <label className='mb-2'>To</label>
                  <input className='form-control mb-3' onChange={(e) => setToDate(e.target.value)}  type="date" required />
                  <label>Status</label>
                  <select className='form-control mb-3' onChange={(e)=>setSt(e.target.value)}>
                     <option>Choose a status</option>
                     <option value="0">Pending</option>
                     <option value="1">Approved</option>
                     <option value="3">Rejected</option>
                  </select>
                  <input className='btn btn-primary' type="submit" value="search" />
               </form>
              {fromD == "" && ToD == "" ? "" :  <h2 className="text-center mb-3">Report from {fromD} to {ToD}</h2>}
           <div className="">
            
           <div class="table-responsive">
        <table class="main-table text-center table table-bordered">
          {Applications.filter(it => it.Status==status).length > 0 ?
             <tr>
                  <td>#</td>
                  <td>Name Jober</td>
                  <td>Job</td>
                  <td>Location</td>
                  <td>Status</td>
                  <td>Action</td>
            </tr> : <div className={`${status== "" ? 'alert alert-info' : ''}`}>{status== "" ? "" : status!=null ? `There is No Application ${status == 0 ? "Pending" : status == 1 ? "Approved" : "Rejected"}` : ""}</div>}
              {Applications.filter(it => it.Status == status).map(item => (
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
  )
}

export default Reports_E


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