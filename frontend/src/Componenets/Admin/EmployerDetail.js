import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import company1 from '../../Componenets/images/company-1.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import employer1 from '../../Componenets/images/employers1.png'
import employer2 from '../../Componenets/images/employers2.png'
import employer3 from '../../Componenets/images/employers3.png'
import employer4 from '../../Componenets/images/employers4.png'

import { useParams } from 'react-router'
import axios from 'axios'

function EmployerDetail() {
    const {id} = useParams();
    const [Employer,setEmployer]=useState([]);
   
    useEffect(() => {
       axios.get(`api/Employers/${id}`).then(res => {
             console.log(res.data);
             setEmployer(res.data)
       }).catch(err => {
            console.log(err);
       })

    },[])

  return (
    <div>
    <div className='d-flex'>
    <SideBar/>
    <div className='w-100'>
    <Content className=''>
<div className='content'>
  <div class="parent p-3">
<h3 class="text-center mb-4">Detail Company</h3>
  <div className='AboutCompany mb-2 d-flex align-items-center'>
            <div className='row ps-4 align-items-center w-100'>
                <div className='col-sm-6 col-md-12'>
                    <div className='row'>
                        <div className='col-sm-6 col-md-2'>
                            <img src={company1} />
                        </div>
                        <div className='col-sm-6 col-md-10'>
                            <h2 className='mb-3'>{Employer.Name}</h2>
                            <ul className='InfoJob mb-2 nav gap-4'>
                        <li className='d-flex gap-1'>
                            <BusinessCenterIcon/> 
                            {Employer.Categories}
                        </li>
                        <li className='d-flex gap-1'>
                            <LocationOnIcon/>
                             {Employer.Location}
                        </li>
                        <li className='d-flex gap-1'>
                        <PhoneIcon/>
                        {Employer.Phone}
                        </li>
                        <li className='d-flex gap-1'>
                            <EmailIcon/>
                            {Employer.email}
                        </li>
                    </ul>
                        </div>
                    </div>
                </div>
            </div>
  </div>
  <div className='AboutCom p-3'>
            <div className='row'>
                <div className='col-sm-6 col-md-8 mb-3'>
                    <h3>About Company</h3>
                    <p className='mb-3'>
                       {Employer.AboutCompany}
                     </p>
                <div className='row mb-3'>
                    <div className='col-sm-6 col-md-4 text-center mb-3'>
                        <img src={employer1} />
                    </div>
                    <div className='col-sm-6 col-md-4 text-center mb-3'>
                        <img src={employer2} />
                    </div>
                    <div className='col-sm-6 col-md-4 text-center mb-3'>
                       <img src={employer3} />
                    </div>
                    <div className='col-sm-6 col-md-4 text-center mb-3'>
                      <img src={employer4} />
                    </div>
               </div>
             
                </div>
               
                <div className='col-sm-6 col-md-4'>
                    <ul className='infoCom p-3'>
                        <li><strong>Industry: </strong>{Employer.Indusrty}</li>
                        <li><strong>Company size: </strong>{Employer.CompanySize}</li>
                        <li><strong>Founded in: </strong>{Employer.Founded}</li>
                        <li><strong>Phone: </strong>{Employer.Phone}</li>
                        <li><strong>Email: </strong>{Employer.email}</li>
                        <li><strong>Country: </strong>{Employer.Country}</li>
                        <li><strong>Location: </strong>{Employer.Location}</li>
                        <li><a href='' className='nav-link'>{Employer.WebSite}</a></li>
                    </ul>
                </div>
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

export default EmployerDetail

const Content = styled.div`
     background-color:#e5e5e5;
    //  height:100vh;  
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
       textarea{
         height:150px;
      }
    }
`