import React,{useState,useEffect, useRef} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {useNavigate} from 'react-router'
import axios, { Axios } from 'axios'
import swal from 'sweetalert';
import styled from 'styled-components'

function Profile() {
  
  const [Auth,setAuth]=useState(false);
  const navigate = useNavigate();
  const [userId,setUserId]=useState([]);
  const [errors,seterrors]=useState([]);
  const imgRef =  useRef(null)
  const [inputs,setInputs]=useState({
        Name:"",
        Phone:"",
        Gender:"",
        Email:"",
        Job:"",
        Birthday:"",
        Profile:"",
        Password:"",
        _method:"PATCH"
  });

  useEffect(() => {

      axios.get("/api/CheckCnadidate").then(res=> {
        if(res.data.status == 200){
          setUserId(res.data.user.id)
          setInputs((prev => ({
           ...prev,
           Name:res.data.user.Name,
           Phone:res.data.user.Phone,
           Gender:res.data.user.Gender,
           Email:res.data.user.Email,
           Job:res.data.user.Job,
           Birthday:res.data.user.Birthday,
           Profile:res.data.user.Profile,
           Password:res.data.user.Password
          })))
          setAuth(true)
         }else{
          setAuth(false)
         }
     })

    return () => {
       setAuth(false);
    }

    },[])

const handlClickimg = ()=>{
  imgRef.current.click()
}
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputs((prevInputValues) => ({
        ...prevInputValues,
        [name]: value
       }));
      };


      const handlimg = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
    
        setInputs((prevInputValues) => ({
          ...prevInputValues,
          [name]: file,
        }));
      };


  const handlUpdate = (e) => {
    e.preventDefault();
    axios.post(`/api/Users/${userId}`,inputs).then(res => {
     console.log(res.data);
     if(res.data.status==200){
      swal(res.data.message,"","success");
      }
    }).catch(err => {
     console.log(err.response.data.errors);
     seterrors(err.response.data.errors);
     })
  }

  axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
      if(err.response.status==401){
         swal("Unauthorized",err.response.data.message,"warning")
         navigate("/login")
       }
       
       return Promise.reject(err)
  })
  
  axios.interceptors.response.use(function(response){
      return response;
  },function(error){
     if(error.response.status==403){
      swal("Forbidden",error.response.data.message,"warning");
      navigate("/login")
      }
      else if(error.response.status==404){
          swal("404 Error","page not found","warning");
          navigate("/login")
      }
      return Promise.reject(error)
   }
  
  )
  return (
    <div>
          <Header/>
          <div className='container p-3'>
          <form onSubmit={handlUpdate}>
            <div className='row'>
   
                  <div className='col-md-3'>
      
                       <Img
                              onClick={handlClickimg} 
                              style={{ cursor: 'pointer' }} 
                              src={`http://localhost:8000/${inputs.Profile}`} 
                          />
                      <input 
                              ref={imgRef} 
                              style={{display:"None"}}
                              type="file"
                              name='Profile'
                              onChange={handlimg} 
                           />
                  </div>
                  <div className='col-md-9'>
              
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='mb-2'>Name</label>
                                <input className='form-control mb-4' name='Name' onChange={handleChange} type="text" value={inputs.Name} />
                                <div className={`${errors!=null && errors.Name != null ? "alert alert-danger" : ""}`}>{`${errors.Name!=null ? errors.Name : ""}`}</div>
                                <label className='mb-2'>Phone</label>
                                <input className='form-control mb-4' name='Phone' type="text" onChange={handleChange}  value={inputs.Phone} />
                                <div className={`${errors!=null && errors.Phone != null ? "alert alert-danger" : ""}`}>{`${errors.Phone!=null ? errors.Phone : ""}`}</div>
                                <label className='mb-2'>Gender</label>
                                <input className='form-control mb-4' name='Gender' type="text" onChange={handleChange} value={inputs.Gender} />
                                <div className={`${errors!=null && errors.Gender != null ? "alert alert-danger" : ""}`}>{`${errors.Gender!=null ? errors.Gender : ""}`}</div>
                            </div>
                            <div className='col-md-6'>
                            <label className='mb-2'>Email</label>
                                <input className='form-control mb-4' name='Email' type="text" onChange={handleChange}  value={inputs.Email} />
                                <div className={`${errors!=null && errors.Email != null ? "alert alert-danger" : ""}`}>{`${errors.Email!=null ? errors.Email : ""}`}</div>
                                <label className='mb-2'>Job</label>
                                <input className='form-control mb-4' name='Job' type="text" onChange={handleChange} value={inputs.Job} />
                                <div className={`${errors!=null && errors.Job != null ? "alert alert-danger" : ""}`}>{`${errors.Job!=null ? errors.Job : ""}`}</div>
                                <label className='mb-2'>Date Birthday</label>
                                <input className='form-control mb-4' name='Birthday' type="date" onChange={handleChange}  value={inputs.Birthday} />
                                <div className={`${errors!=null && errors.Birthday != null ? "alert alert-danger" : ""}`}>{`${errors.Birthday!=null ? errors.Birthday : ""}`}</div>
                                <label className='mb-2'>Password</label>
                                <input className='form-control mb-4' name='Password' type="Password" onChange={handleChange} />
                            </div>

                          </div>
                          <input style={{float:"right"}} type="submit" className='btn btn-primary' value="Update" />
                     
                  </div>
                  
            </div>
            </form>
          </div>
          <Footer/>
    </div>
  )
}

export default Profile

const Img = styled.img`
   width:200px;
   height:160px;
  border-radius:50%;
`