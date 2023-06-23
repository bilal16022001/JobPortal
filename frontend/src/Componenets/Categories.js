import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Categories() {
  return (
    <div className='mb-3'>
        <div className='container'>
            <div className='title text-center mb-4'>
                <h2>Popular Job Categories</h2>
            </div>
            <div className='row '>
                <div className='col-sm-6 col-md-4 mb-3'>
                    <div className='d-flex gap-2 border border-3 border-solid p-3'>
                        <div className=''>
                            <MonetizationOnIcon className='acco' />
                        </div>
                        <div className=''>
                            <h4><a href=''>Accounting / Finance</a></h4>
                            <a className='nav-link' href=''>(20 Open Position)</a>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-4 mb-3'>
                    <div className='d-flex gap-2 border border-3 border-solid p-3'>
                        <div className=''>
                            <MonetizationOnIcon className='acco' />
                        </div>
                        <div className=''>
                            <h4><a href=''>Marketing</a></h4>
                            <a className='nav-link' href=''>(6 Open Position)</a>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-4 mb-3'>
                    <div className='d-flex gap-2 border border-3 border-solid p-3'>
                        <div className=''>
                            <MonetizationOnIcon className='acco' />
                        </div>
                        <div className=''>
                            <h4><a href=''>Project Management</a></h4>
                            <a className='nav-link' href=''>(6 Open Position)</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Categories