import React,{useState} from 'react'
import SideBar from './SideBar';
import styled from 'styled-components';
import axios from 'axios';
import {fetchEmployers,fetchCandidates} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function Reports() {

    const [fromD,setformD]=useState("");
    const [ToD,setTod]=useState("");
    const [FromDate,setFromDate]=useState("");
    const [ToDate,setToDate]=useState("");

    const employers = useSelector((state) => state.Data.Employers);
    const Candidates = useSelector((state) => state.Data.Candidates);

    const dispatch = useDispatch();
   
    dispatch(fetchEmployers());
    dispatch(fetchCandidates());

    const HandlReports = (e) => {
        e.preventDefault();  

        setformD(FromDate)
        setTod(ToDate);
    
    }

  return (
    <div className='d-flex'>
    <SideBar/>
      <div className='w-100'>
        <Content className=''>
        <div className='content'>
            <div class="parent p-3">
               <h3>report of how many employers and candidates register between two dates</h3>
               <form className='mb-3' onSubmit={HandlReports}>
                  <label className='mb-2'>From</label>
                  <input className='form-control mb-3' onChange={(e) => setFromDate(e.target.value)} type="date" required/>
                  <label className='mb-2'>To</label>
                  <input className='form-control mb-3' onChange={(e) => setToDate(e.target.value)}  type="date" required />
                  <input className='btn btn-primary' type="submit" value="search" />
               </form>
              {fromD == "" && ToD == "" ? "" :  <h2 className="text-center mb-3">Report from {fromD} to {ToD}</h2>}
           <div className="">
            
              <h2>  <Link className='d-block mb-3' to={`/Admin/Report/role=/Employers&/from/${fromD}&to/${ToD}`}>Employers : {employers.filter(item => item.created_at.slice(0,10) >= fromD && item.created_at.slice(0,10) <= ToD).length}</Link></h2>
              <h2>  <Link to={`/Admin/Report/role=/Candidates&/from/${fromD}&to/${ToD}`}>Candidates : {Candidates.filter(item => item.created_at.slice(0,10) >= fromD && item.created_at.slice(0,10) <= ToD).length}</Link></h2>
               
              </div>
          </div>
      </div>

      </Content>
      </div>
    </div>
  )
}

export default Reports


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