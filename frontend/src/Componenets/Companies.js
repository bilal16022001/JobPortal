import React, { useEffect } from 'react'
import company1 from '../Componenets/images/company-1.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import {fetchEmployers} from './Redux-toolkit/Slice'
import { useDispatch, useSelector } from 'react-redux';

function Companies() {
   const Employers = useSelector((state) => state.Data.Employers);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchEmployers());
   },[])

  return (
    <div className='Companies p-5 mb-4'>
        <div className='container'>
            <h1 className='text-center mb-3'>Top Company Registered</h1>
            <p className='text-center mb-4'>Some of the companies we have helped recruit excellent applicants over the years.</p>
            <div className='allComp row text-center'>
          
            <div className='allComp row text-center'>
              {Employers.length > 0 ? Employers.map(item => (
              <div className='company col-sm-6 col-md-3'>
              <img  className='mb-2 rounded-circle' style={{height: "111px",width: "130px"}} src={`http://localhost:8000/${item.logo}`} />
              <a className='nav-link mb-2' href=''>{item.Name}</a>
              <span className='d-block mb-2'><LocationOnIcon/> {item.Country}</span>
              <Link className='nav-link mb-2' to={`/Company/${item.id}`}>{item.jobs.length} Open Position</Link>
           </div>
            
         )) : <div>There no Company Registred</div>}
         
            </div>
            </div>
        </div>
    </div>
  )
}

export default Companies