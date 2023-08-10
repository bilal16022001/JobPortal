import React,{useState,useEffect, useRef} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {useNavigate} from 'react-router'
import axios, { Axios } from 'axios'
import swal from 'sweetalert';
import styled from 'styled-components'
import SideBar from './SideBar'

function Profile_A() {
  
  const [Auth,setAuth]=useState(false);
  const navigate = useNavigate();
  const [userId,setUserId]=useState([]);
  const [errors,seterrors]=useState([]);
  const imgRef =  useRef(null)
  const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
        profile:"",
        _method:"PATCH"
  });

  useEffect(() => {

      axios.get("/api/CheckAuth").then(res=> {
        if(res.data.status == 200){
          console.log(res.data.user)
          setUserId(res.data.user.id)
          setInputs((prev => ({
           ...prev,
           name:res.data.user.name,
           email:res.data.user.email,
           password:"",
           profile:res.data.user.profile,
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
    axios.post(`/api/Admin/${userId}`,inputs).then(res => {
     console.log(res.data);
     if(res.data.status==200){
          swal(res.data.message,"","success");
      }
    }).catch(err => {
     console.log(err);
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
    <div className='d-flex'>
        <SideBar/>
       <div className='w-100'>
       <Content className=''>
          <div className='container p-3'>
          <form onSubmit={handlUpdate}>
            <div className='row'>
   
                       <Img
                              onClick={handlClickimg} 
                              style={{ cursor: 'pointer' }} 
                              src={`http://localhost:8000/${inputs.profile}`} 
                          />
                      <input 
                              ref={imgRef} 
                              style={{display:"None"}}
                              type="file"
                              name='profile'
                              onChange={handlimg} 
                           />
                             <label className='mb-2'>Name</label>
                                <input className='form-control mb-4' name='name' onChange={handleChange} type="text" value={inputs.name} />
                                <div className={`${errors!=null && errors.name != null ? "alert alert-danger" : ""}`}>{`${errors.name!=null ? errors.name : ""}`}</div>
                                <label className='mb-2'>Email</label>
                                <input className='form-control mb-4' name='email' type="text" onChange={handleChange}  value={inputs.email} />
                                <div className={`${errors!=null && errors.email != null ? "alert alert-danger" : ""}`}>{`${errors.email!=null ? errors.email : ""}`}</div>
                                <label className='mb-2'>Password</label>
                                <input className='form-control mb-4' name='password' type="Password" onChange={handleChange} />
      
                 <input  type="submit" className='btn btn-primary' value="Update" />
                 
                  
            </div>
            </form>
          </div>
      </Content>
        </div>
    </div>
  )
}

export default Profile_A

const Img = styled.img`
   width:200px;
   height:160px;
  border-radius:50%;
`

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
    }
`