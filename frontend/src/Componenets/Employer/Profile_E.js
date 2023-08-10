import React,{useState,useEffect, useRef} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {useNavigate} from 'react-router'
import axios, { Axios } from 'axios'
import swal from 'sweetalert';
import styled from 'styled-components'
import SideBar_E from './SideBar_E'

function Profile_E() {
  
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

      axios.get("/api/CheckEmployer").then(res=> {
        if(res.data.status == 200){
          console.log(res.data.user)
          setUserId(res.data.user.id)
          setInputs((prev => ({
           ...prev,
           name:res.data.user.Name,
           email:res.data.user.email,
           Password:res.data.user.Password,
           logo:res.data.user.logo,
           Location:res.data.user.Location,
           Categories:res.data.user.Categories,
           Phone:res.data.user.Phone,
           Indusrty:res.data.user.Indusrty,
           CompanySize:res.data.user.CompanySize,
           Founded:res.data.user.Founded,
           WebSite:res.data.user.WebSite,
           Address:res.data.user.Address,
           Country:res.data.user.Country,
           AboutCompany:res.data.user.AboutCompany
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
    axios.post(`/api/Employers/${userId}`,inputs).then(res => {
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
        <SideBar_E/>
       <div className='w-100'>
       <Content className=''>
          <div className='container p-3'>
          <form onSubmit={handlUpdate}>
            <div className='row'>
   
               <div className='col-md-4'>
                       <Img
                              onClick={handlClickimg} 
                              style={{ cursor: 'pointer' }} 
                              src={`http://localhost:8000/${inputs.logo}`} 
                          />
                      <input 
                              ref={imgRef} 
                              style={{display:"None"}}
                              type="file"
                              name='logo'
                              onChange={handlimg} 
                           />
                      </div>
                      <div className='col-md-8'>

                          <div className='row'>
                            <div className='col-md-6'>
                                <label className='mb-2'>Name</label>
                                <input className='form-control mb-4' name='name' onChange={handleChange} type="text" value={inputs.name} />
                                <div className={`${errors!=null && errors?.name != null ? "alert alert-danger" : ""}`}>{`${errors?.name!=null ? errors?.name : ""}`}</div>
                            </div>
                            <div className='col-md-6'>
                            <label className='mb-2'>Email</label>
                                <input className='form-control mb-4' name='email' type="text" onChange={handleChange}  value={inputs.email} />
                                <div className={`${errors!=null && errors?.email != null ? "alert alert-danger" : ""}`}>{`${errors?.email!=null ? errors?.email : ""}`}</div>
                            </div>
                            <div className='col-md-6'>
                            <label className='mb-2'>Location</label>
                                <input className='form-control mb-4' name='Location' type="text" onChange={handleChange}  value={inputs?.Location} />
                                <div className={`${errors!=null && errors?.Location != null ? "alert alert-danger" : ""}`}>{`${errors?.Location!=null ? errors?.Location : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Categories</label>
                                {/* <input className='form-control mb-4' name='Categories' type="text" onChange={handleChange}  value={inputs.Categories} />
                                <div className={`${errors!=null && errors.Categories != null ? "alert alert-danger" : ""}`}>{`${errors.Categories!=null ? errors.Categories : ""}`}</div> */}
                                <select className='form-control mb-4' name='Categories' onChange={handleChange}>
                                   <option>Choose Category</option>
                                   <option value="Marketing" selected={inputs.Categories == "Marketing" ? "Selected" : ""}>Marketing</option>
                                   <option value="Project Management" selected={inputs.Categories == "Project Management" ? "Selected" : ""}>Project Management</option>
                                   <option value="Finanace / Accounting" selected={inputs.Categories == "Finanace / Accounting" ? "Selected" : ""}>Finanace / Accounting</option>
                                   <option value="information & technology" selected={inputs.Categories == "information & technology" ? "Selected" : ""}>information & technology</option>
                                   <option value="Design" selected={inputs.Categories == "Marketing" ? "Design" : ""}>Design</option>
                                </select>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Phone</label>
                                <input className='form-control mb-4' name='Phone' type="text" onChange={handleChange}  value={inputs.Phone} />
                                <div className={`${errors!=null && errors?.Phone != null ? "alert alert-danger" : ""}`}>{`${errors?.Phone!=null ? errors?.Phone : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Indusrty</label>
                                <input className='form-control mb-4' name='Indusrty' type="text" onChange={handleChange}  value={inputs.Indusrty} />
                                <div className={`${errors!=null && errors?.Indusrty != null ? "alert alert-danger" : ""}`}>{`${errors?.Indusrty!=null ? errors?.Indusrty : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>CompanySize</label>
                                <input className='form-control mb-4' name='CompanySize' type="text" onChange={handleChange}  value={inputs.CompanySize} />
                                <div className={`${errors!=null && errors?.CompanySize != null ? "alert alert-danger" : ""}`}>{`${errors?.CompanySize!=null ? errors?.CompanySize : ""}`}</div>
                            </div> 
                            <div className='col-md-6'>
                            <label className='mb-2'>Founded</label>
                                <input className='form-control mb-4' name='Founded' type="text" onChange={handleChange}  value={inputs.Founded} />
                                <div className={`${errors!=null && errors?.Founded != null ? "alert alert-danger" : ""}`}>{`${errors?.Founded!=null ? errors?.Founded : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>WebSite</label>
                                <input className='form-control mb-4' name='WebSite' type="text" onChange={handleChange}  value={inputs.WebSite} />
                                <div className={`${errors!=null && errors?.WebSite != null ? "alert alert-danger" : ""}`}>{`${errors?.WebSite!=null ? errors?.WebSite : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Address</label>
                                <input className='form-control mb-4' name='Address' type="text" onChange={handleChange}  value={inputs.Address} />
                                <div className={`${errors!=null && errors?.Address != null ? "alert alert-danger" : ""}`}>{`${errors?.Address!=null ? errors?.Address : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Country</label>
                                <input className='form-control mb-4' name='Country' type="text" onChange={handleChange}  value={inputs.Country} />
                                <div className={`${errors!=null && errors?.Country != null ? "alert alert-danger" : ""}`}>{`${errors?.Country!=null ? errors?.Country : ""}`}</div>
                            </div>  
                            <div className='col-md-6'>
                            <label className='mb-2'>Password</label>
                                <input className='form-control mb-4' name='Password' type="password" onChange={handleChange} />
                            </div> 
                            <div className='col-md-12'>
                            <label className='mb-2'>About Company</label>
                                <textarea className='form-control mb-4' name='AboutCompany' onChange={handleChange} value={inputs.AboutCompany}></textarea>
                            </div>   
                          </div>
                                
                   </div>
                 <input style={{float:"right"}}  type="submit" className='btn btn-primary' value="Update" />
                 
                  
            </div>
            </form>
          </div>
      </Content>
        </div>
    </div>
  )
}

export default Profile_E

const Img = styled.img`
   width:200px;
   height:160px;
  border-radius:50%;
`

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