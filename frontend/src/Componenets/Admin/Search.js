import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import styled from 'styled-components';
import {fetchEmployers,fetchCandidates} from '../Redux-toolkit/Slice'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

function Search() {
  
  const [Search,setSearch]=useState("");
  const [showRslt,setShowRslt]=useState("");
  const [who,setWho]=useState("");
  const employers = useSelector((state) => state.Data.Employers);
  const Candidates = useSelector((state) => state.Data.Candidates);
  const [Data,setData] = useState([]);
  const dispatch = useDispatch();
 
  dispatch(fetchEmployers());
  dispatch(fetchCandidates());


const handlSearch = (e) => {
  e.preventDefault();
console.log("test search");

 const data = new FormData();
       data.append("Search",Search);
       data.append("person",who);

    axios.post("/api/filterSearchuUser",data).then(res => {
          console.log(res.data);
          setData(res.data)
    }).catch(err => {
        console.log(err);
    })
    
}



  return (
    <div className='d-flex'>
    <SideBar/>
      <div className='w-100'>
        <Content className=''>
        <div className='content'>
             <div class="parent p-3">
                <form onSubmit={handlSearch} className="mb-3">
                   <input className='d-block mb-3' type="search" name="Search" onChange={(e) => setSearch(e.target.value)} placeholder='phone Or Order Number' />
                   <select className='form-control mb-3' onChange={(e) => setWho(e.target.value)}>
                      <option>choose who to search for</option>
                      <option value="Employers">Employers</option>
                      <option value="Candidates">Candidates</option>
                   </select>
                   <input className='btn btn-primary' type="submit" value="search" />
                </form>
                <div className="">
            <div className="table-responsive">
                <table className="main-table text-center table table-bordered">
                     <tr>
                          <td>#</td>
                          <td>Name</td>
                          <td>Phone</td>
                          <td>Email</td>
                          <td>Action</td>
                    </tr>
                    {Data.length > 0 && <>
                  {Data.map(item => (
                       <tr>
                          <td>{item.id}</td>
                          <td>{item.Name}</td>
                          <td>{item.Phone}</td>
                          <td>{who=="Employers" ? item.email : item.Email}</td>
                          <td>
                              <Link to={`/Admin/${who=="Employers" ? "Employer" : "Candidate"}/${item.id}`}><VisibilityIcon/></Link>
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
  )
  
}

export default Search

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