import React, { useEffect } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {fetchCategories} from './Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

function Categories() {
    const Categories = useSelector((state) => state.Data.Categories);
    const dispatch = useDispatch();

   useEffect(() => {
     dispatch(fetchCategories())
   },[])
  console.log(Categories);
  return (
    <div className='mb-3'>
        <div className='container'>
            <div className='title text-center mb-4'>
                <h2>Popular Job Categories</h2>
            </div>
            <div className='row '>
                {Categories.length > 0 ? Categories.map(item => (
                  <div className='col-sm-6 col-md-4 mb-3'>
                  <div className='d-flex gap-2 border border-3 border-solid p-3'>
                      <div className=''>
                          <MonetizationOnIcon className='acco' />
                      </div>
                      <div className=''>
                          <h4><a href=''>{item.Name}</a></h4>
                          <Link className='nav-link' to={`/Category/${item.id}`}>({item.jobs.length} Open Position)</Link>
                      </div>
                  </div>
              </div>
                )) : <div>There no Categories</div>}
            </div>
        </div>
    </div>
  )
}

export default Categories