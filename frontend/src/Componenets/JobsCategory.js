import React,{useEffect,useMemo} from 'react'
import { useParams } from 'react-router'
import Header from './Header';
import Footer from './Footer';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {fetchCategories} from './Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'

function JobsCategory() {
    const {id} = useParams();
    const Categories = useSelector((state) => state.Data.Categories);
    const dispatch = useDispatch();

   useEffect(() => {
     dispatch(fetchCategories());

   },[])

  //filter jobs with category
    const filterJobs = useMemo(
        () => Categories.filter(item => item.id == id),
        [Categories]
    );

    console.log("filterJobs",filterJobs);
  return (
    <div>
    <Header/>
    <div className='container p-3'>
     <h3 className='mb-3'>Category with jobs</h3>
     <div className='row'>
       {filterJobs.length > 0 ? filterJobs.map(item => (
         <>
         {item.jobs.length > 0 ? item.jobs.map(it => (
          <div className='col-sm-6 col-md-4 '>
            <div className='logoCompany'>
                 <img style={{width:"100px"}} className="rounded-circle"  src={`http://localhost:8000/${it.company.logo}`} />
            </div>
          <h4 className='mb-2'>{item.jobs.id}</h4>
          <ul className='InfoJob mb-2 nav gap-4'>
              <li className=''>
                  <BusinessCenterIcon/> 
                  {it.company.Name}
              </li>
              <li>
                  <LocationOnIcon/>
                  {it.Location} ({it.Place})
              </li>
              <li>
                  <QueryBuilderIcon/>
                  11 hours ago
              </li>
              <li>
                  <AttachMoneyIcon/>
                  {it.Salary}
              </li>
          </ul>
          <ul className='OtherInfoJb nav gap-4'>
              <li className='type p-1 pe-3 ps-3'>

                {it.Type}
              </li>
              <li className='urgent p-1 pe-3 ps-3'>
              {it.Status}

              </li>
          </ul>
          </div>
          ))
          :
          <div>There is no Jobs of this Category</div>}
        </>
       
     
       )) : <div className='alert alert-info'>There no Applied job</div>} 
     
        
       </div>
    </div>
     <Footer/>
</div>
  )
}

export default JobsCategory


