import React from 'react'
import { useParams } from 'react-router'
import SideBar from './SideBar'
import styled from 'styled-components'
import {fetchEmployers,fetchCandidates} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';

function DetailRaport() {
    const {role,from,to}=useParams();
    const employers = useSelector((state) => state.Data.Employers);
    const Candidates = useSelector((state) => state.Data.Candidates);
    console.log("empolyers =>",employers.filter(item => item.created_at.slice(0,10) >= from && item.created_at.slice(0,10) <= to).length);
    console.log("Candidates =>",Candidates.filter(item => item.created_at.slice(0,10) >= from && item.created_at.slice(0,10) <= to).length);
    const dispatch = useDispatch();
   
    dispatch(fetchEmployers());
    dispatch(fetchCandidates());
  return (
    <div> 
    <div className='d-flex'>
    <SideBar/>
    <div className='w-100'>
    <Content className=''>
<div className='content'>
  <div class="parent p-3">
<h2 class="text-center mb-4">Report of {role} Register between {from} - {to}</h2>
<div class="">
    <div class="table-responsive">
        <table class="main-table text-center table table-bordered">
             <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Phone</td>
                  <td>Email</td>
                  <td>Action</td>
            </tr>
              {role=="Employers" ? employers.filter(item => item.created_at.slice(0,10) >= from && item.created_at.slice(0,10) <= to).map(item => (
                   <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Phone}</td>
                      <td>{item.email}</td>
                      <td>
                          <Link to={`/Admin/Employer/${item.id}`}><VisibilityIcon/></Link>
                      </td>
                   </tr>
                   
              )) :  Candidates.filter(item => item.created_at.slice(0,10) >= from && item.created_at.slice(0,10) <= to).map(item => (
                <tr>
                   <td>{item.id}</td>
                   <td>{item.Name}</td>
                   <td>{item.Phone}</td>
                   <td>{item.Email}</td>
                   <td>
                       <Link to={`/Admin/Candidate/${item.id}`}><VisibilityIcon/></Link>
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

export default DetailRaport

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