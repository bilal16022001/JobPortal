import React from 'react'
import { useParams } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import company1 from '../Componenets/images/company-1.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import employer1 from './images/employers1.png'
import employer2 from './images/employers2.png'
import employer3 from './images/employers3.png'
import employer4 from './images/employers4.png'
import logoCom from './images/logoC.png'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function DetailCompany() {
  return (
    <div>
        <Header/>
        <div className='AboutCompany mb-2 d-flex align-items-center'>
            <div className='row ps-4 align-items-center w-100'>
                <div className='col-sm-6 col-md-10'>
                    <div className='row'>
                        <div className='col-sm-6 col-md-1 me-3'>
                            <img src={company1} />
                        </div>
                        <div className='col-sm-6 col-md-9'>
                            <h3>Udemy</h3>
                            <ul className='InfoJob mb-2 nav gap-4'>
                        <li className=''>
                            <BusinessCenterIcon/> 
                            Freelancer
                        </li>
                        <li>
                            <LocationOnIcon/>
                            London, UK
                        </li>
                        <li>
                        <PhoneIcon/>
                        +223434545
                        </li>
                        <li>
                            <EmailIcon/>
                            email@example.com
                        </li>
                    </ul>
                        </div>
                    </div>
                </div>
                <div className='col-sm-6 col-md-2'>
                    <button className='btn btn-primary'>Private Message</button>
                </div>
            </div>
        </div>
        <div className='AboutCom p-3'>
            <div className='row'>
                <div className='col-sm-6 col-md-8 mb-3'>
                    <h3>About Company</h3>
                    <p className='mb-3'>
                        Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services.

                    Moody’s was founded by John Moody in 1909 to produce manuals of statistics related to stocks and bonds and bond ratings. Moody’s was acquired by Dun & Bradstreet in 1962. In 2000, Dun & Bradstreet spun off Moody’s Corporation as a separate company that was listed on the NYSE under MCO. In 2007, Moody’s Corporation was split into two operating divisions, Moody’s Investors Service, the rating agency, and Moody’s Analytics, with all of its other products.
                </p>
                <div className='row mb-3'>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                        <img src={employer1} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                        <img src={employer2} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                       <img src={employer3} />
                    </div>
                    <div className='col-sm-6 col-md-3 text-center mb-3'>
                      <img src={employer4} />
                    </div>
                </div>
               <p className='mb-2'>Moody’s Corporation, often referred to as Moody’s, is an American business and financial services company. It is the holding company for Moody’s Investors Service (MIS), an American credit rating agency, and Moody’s Analytics (MA), an American provider of financial analysis software and services.</p>
               <div className='relatedJobs'>
                    <h2>Related jobs</h2>
               <div className='mb-3'>
               <div className='border border-3 border-solid p-3'>
              <div className='logoCompany mb-3'>
                 <img src={logoCom} />
              </div>
              <div className='job'>
                <h4 className='mb-2'>Software Engineer (Android), Libraries</h4>
                <ul className='InfoJob mb-2 nav gap-4'>
                    <li className=''>
                        <BusinessCenterIcon/> 
                        Upwork
                    </li>
                    <li>
                        <LocationOnIcon/>
                        London, UK
                    </li>
                    <li>
                        <QueryBuilderIcon/>
                        11 hours ago
                    </li>
                    <li>
                        <AttachMoneyIcon/>
                        $35k - $45k
                    </li>
                </ul>
                <ul className='OtherInfoJb nav gap-4'>
                    <li className='type p-1 pe-3 ps-3'>

                        Full-Time
                    </li>
                    <li className='urgent p-1 pe-3 ps-3'>
                        Urgent
                    </li>
                </ul>
              </div>
               </div>
               </div>
               
                </div>
                </div>
               
                <div className='col-sm-6 col-md-4'>
                    <ul className='infoCom p-3'>
                        <li><strong>Industry: </strong>Software</li>
                        <li><strong>Company size: </strong>501-1,000</li>
                        <li><strong>Founded in: </strong>2017</li>
                        <li><strong>Phone: </strong>+23234434</li>
                        <li><strong>Email: </strong>info@udemy.com</li>
                        <li><strong>Location: </strong>London, UK</li>
                        <li><a href='' className='nav-link'>www.udemy.com</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default DetailCompany