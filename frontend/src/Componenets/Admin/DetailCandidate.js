import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { useParams } from 'react-router'
import axios from 'axios'
import user from '../../Componenets/images/user2 (1).webp'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function DetailCandidate() {

    const {id} = useParams();
    const [Candidate,setCandidate]=useState([]);

     useEffect(() => {
        getDetailCand();
    },[]);

     const getDetailCand = () => {
       axios.get(`api/Users/${id}`).then(res => {
            console.log(res.data);
            setCandidate(res.data);
      }).catch(err => {
           console.log(err);
      })
    }

    return (
        <div>
        <div className='d-flex'>
        <SideBar/>
        <div className='w-100'>
        <Content className=''>
    <div className='content'>
      <div class="parent p-3">
      <div className='AboutCandidate'>
      <div className='mb-2 d-flex align-items-center'>
                <div className='row ps-4 align-items-center w-100'>
                    <div className='col-sm-6 col-md-10'>
                        
                        <div className='row'>
                            <div className='col-sm-6 col-md-2'>
                                <img className='user' src={`http://localhost:8000/${Candidate.Profile}`} />
                            </div>
                            <div className='col-sm-6 col-md-10'>
                                <h2 className='mb-3'>{Candidate.Name}</h2>
                                <ul className='InfoJob mb-2 nav gap-4'>
                            <li className='d-flex gap-1'>
                              Job: {Candidate.Job}
                            </li>
                            <li className='d-flex gap-1'>
                            <PhoneIcon/>
                            {Candidate.Phone}
                            </li>
                            <li className='d-flex gap-1'>
                                <EmailIcon/>
                                {Candidate.Email}
                            </li>
                            <li className='d-flex gap-1'>
                                <AccessTimeIcon/>
                                Member Since,  {Candidate.created_at}
                            </li>
                        </ul>
                            </div>
                        </div>

                    </div>
                   <div className='col-md-2'>
                   <a className='btn btn-primary'>Download cv</a>
                   </div>
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

export default DetailCandidate

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
      .user{
        width:100%;
         border-radius: 50%;
       }
    }
`