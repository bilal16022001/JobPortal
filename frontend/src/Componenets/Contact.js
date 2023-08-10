import React,{useState,useEffect} from 'react'
import Footer from './Footer'
import Header from './Header'
import adress from './images/adress.svg'
import smartphone from './images/smartphone.svg'
import letter from './images/letter.svg'
import axios from 'axios'

function Contact() {

   const [Contact,seContact]=useState([]);

   useEffect(() => {
 
     axios.get("api/Contacts").then(res => {
         seContact(res.data)
     }).catch(err => {
        console.log(err);
     });
 
 
   },[]);
   
  return (
    <div className='contact'>
        <Header/>
        <div className='container'>
        <div className='row text-center p-3'>
             <div className='col-sm-6 col-md-4 mb-4'>
                <img className='' src={adress} />
                <p className='m-0 p-0'>Address</p>
                <p className='m-0 p-0'>{Contact.Address}</p>
             </div>
             <div className='col-sm-6 col-md-4 mb-4'>
             <img  src={smartphone} />
                <p className='m-0 p-0'>Call Us</p>
                <p className='m-0 p-0'>{Contact.Phone}</p>
                </div>
             <div className='col-sm-6 col-md-4 mb-4'>
             <img  src={letter} />
                <p className='m-0 p-0'>Email</p>
                <p className='m-0 p-0'>{Contact.Email}</p>
                </div>
        </div>
        <div className='message p-4 '>
           <form className='border border-3 border-solid p-3'>
              <h2 className='mb-3'>Leave A Message</h2>
              <div className='row'>
                <div className='col-sm-6 col-md-6'>
                    <label className='mb-2'>Your Name</label>
                    <input type="text" className='form-control' placeholder='Your Name' />
                </div>
                <div className='col-sm-6 col-md-6 mb-2'>
                    <label className='mb-2'>Your Email</label>
                    <input type="email" className='form-control' placeholder='Your Email' />
                </div>
                <div className='col-md-12 mb-3'>
                   <label className='mb-2'>Subject</label>
                    <textarea className='form-control' placeholder='Subject...'></textarea>
                </div>
                <div className='col-md-12 mb-3'>
                   <label className='mb-2'>Your Message</label>
                    <textarea className='form-control' placeholder='Write your Message...'></textarea>
                </div>
                <input type="submit" className='btn btn-primary' value="Send Message" />
              </div>
           </form>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact