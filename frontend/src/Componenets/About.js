import React,{useEffect, useState} from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from 'axios';

function About() {
   const [About,setAbout]=useState([])
  useEffect(() => {

    axios.get("api/About").then(res => {
      setAbout(res.data)
    }).catch(err => {
       console.log(err);
    });


  },[]);
  return (
    <div>
        <Header/>
        <div className='p-5 text-center'>
            <h2 className='mb-2'>{About.Title}</h2>
            <p style={{lineHeight: "2.3"}}>{About.Description}</p>
        </div>
        <Footer/>
    </div>
  )
}

export default About