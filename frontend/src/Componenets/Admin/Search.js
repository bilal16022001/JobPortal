import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import styled from 'styled-components';
import {fetchEmployers,fetchCandidates} from '../Redux-toolkit/Slice'
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Search() {
  
  const [Search,setSearch]=useState("");
  const [showRslt,setShowRslt]=useState("");
  const [who,setWho]=useState("");
  const employers = useSelector((state) => state.Data.Employers);
  const Candidates = useSelector((state) => state.Data.Candidates);

  const dispatch = useDispatch();
 
  dispatch(fetchEmployers());
  dispatch(fetchCandidates());


const handlSearch = (e) => {
  e.preventDefault();

 setShowRslt(Search)
    
}

const handlWho = (e) => {
  setWho(e.target.value);
}

  return (
    <div className='d-flex'>
    <SideBar/>
      <div className='w-100'>
        <Content className=''>
        <div className='content'>
             <div class="parent p-3">
                <form onSubmit={handlSearch} className="mb-3">
                   <input className='d-block mb-3' type="search" onChange={(e) => setSearch(e.target.value)} placeholder='phone Or Order Number' />
                   <select className='form-control mb-3' onChange={handlWho}>
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