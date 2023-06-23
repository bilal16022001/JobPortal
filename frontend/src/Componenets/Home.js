import React from 'react'
import HomeImg from './images/2.png'
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import SomeJobs from './SomeJobs';
import HowWork from './HowWork';
import Companies from './Companies';
import Categories from './Categories';
import SomeBlogs from './SomeBlogs';
import Footer from './Footer';
import Header from './Header';

function Home() {
  return (
    <>
    <Header/>
    <div className='position-relative Home'>
        <img className='HomeImg' src={HomeImg} />
        <div className='desc position-absolute top-50 start-50  translate-middle'>
           <div className=''>
           <h1 className='text-white fw-bold mb-3'>Join us & Explore All Jobs Match You</h1>
            <p className='text-white fs-5'>Find Jobs, Employment & Career Opportunities</p>
           </div>
            <form className='searchJob d-flex'>
               <div className='jobTitle position-relative'>
               <SearchIcon className='position-absolute top-50 ms-2 translate-middle' /> 
               <input type="text" className='' placeholder='Job Title, Keywords, Or Company' />
               </div>
               <div className='City position-relative'>
                <LocationOnIcon  className='position-absolute top-50 ms-2 translate-middle'/>
                  <input type="text" placeholder='City' />
               </div>
               <div className='Categories  position-relative'>
                <CategoryIcon className='position-absolute top-50 ms-2 translate-middle' />
                  <select>
                    <option>All Categories</option>
                      <option>marketing</option>
                      <option>web Deve...</option>
                      <option>HR</option>
                      <option>Product Manager</option>
                  </select>
               </div>
               <button type='submit'>Find Jobs</button>
            </form>
        </div>
    </div>
    <div className='container'>
         <SomeJobs  />
         <HowWork/>
    </div>
    <Companies/>
    <Categories/>
    <SomeBlogs/>
    <Footer/>
    </>
  )
}

export default Home