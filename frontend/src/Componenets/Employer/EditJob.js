import React,{useEffect, useState} from 'react'
import SideBar_E from './SideBar_E'
import styled from 'styled-components';
import axios from 'axios';
import {fetchCategories} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import swal from 'sweetalert'

function EditJob() {

  const [Auth,setAuth] = useState(false);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.Data.Categories);
  const {id} = useParams();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    Job: "",
    Category_id: "",
    Type:"",
    Level:"",
    Salary:"",
    Hours:"",
    Rate:"",
    Skills:"",
    Experience:"",
    Location:"",
    Place:"",
    Expired_Date:"",
    Description:"",
    Responsibilities:"",
    Status:"",
    _method:"PATCH"
  }); 

  useEffect(() => {
   dispatch(fetchCategories());
   axios.get(`/api/Job/${id}`).then(res => {
    setInputValues((prev => ({
       ...prev,
       Job:res.data.Job,
       Category_id:res.data.Category_id,
       Type:res.data.Type,
       Level:res.data.Level,
       Salary:res.data.Salary,
       Hours:res.data.Hours,
       Rate:res.data.Rate,
       Skills:res.data.Skills,
       Experience:res.data.Experience,
       Location:res.data.Location,
       Place:res.data.Place,
       Expired_Date:res.data.Expired_Date,
       Description:res.data.Description,
       Responsibilities:res.data.Responsibilities,
       Status:res.data.Status,
       _method:"PATCH"
    })))
 }).catch(err => {
    console.log(err);
 })
     axios.get("/api/CheckEmployer").then(res=> {
            if(res.data.status == 200){
              console.log(res.data.message)
              setAuth(true)
             }else{
              setAuth(false)
             }
     })
  
        return () => {
           setAuth(false);
        }
  },[]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    }));
    };

    const Editjob = (e) => {
        e.preventDefault();

        axios.post(`/api/Job/${id}`,inputValues).then(res => {
            if(res.data.status==200){
               swal(res.data.message,"","success");
               navigate("/Employer/jobs");
            }
     
       
      }).catch(err => {
         console.log(err);
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
            swal("404 Error","page not f-ond","warning");
            navigate("/Page403")
        }
        return Promise.reject(error)
     }
    
    )
    return (
        <div>
            <div className='d-flex'>
            <SideBar_E/>
            <div className='w-100'>
            <Content className=''>
        <div className='content'>
          <div class="parent p-3">
        <h2 class="mb-4">Edit job</h2>
        <form onSubmit={Editjob}>
        <div className='row'>
          <div className='col-md-6'>
             <input type="text" placeholder='Enter Job Title' value={inputValues.Job} className='form-control mb-2' name='Job' onChange={handleChange} required  />
             <select className='mb-2 form-control'  name='Category_id' onChange={handleChange} required >
                <option>choose Category</option>
                {categories?.map(item => (
                 <option value={item.id} selected={item.id == inputValues.Category_id ? "selected" : ""}>{item.Name}</option>
                ))}
             </select>
             <select className='mb-2 form-control'  name='Type' onChange={handleChange} required >
                <option>choose Type Job</option>
                <option value="Full-time" selected={"Full-time" == inputValues.Type ? "selected" : ""}>Full-time</option>
                <option value="Part-time" selected={"Part-time" == inputValues.Type ? "selected" : ""}>Part-time</option>
                <option value="Internship" selected={"Internship" == inputValues.Type ? "selected" : ""}>Internship</option>
                <option value="Mid-level Senior" selected={"Mid-level Senior" == inputValues.Type ? "selected" : ""}>Mid-level Senior</option>
                <option value="Senior" selected={"Senior" == inputValues.Type ? "selected" : ""}>Senior</option>
             </select>
             <input type="text" placeholder='Enter Level' value={inputValues.Level} className='form-control mb-2' name='Level' onChange={handleChange} required />
             <input type="text" placeholder='Enter Salary' value={inputValues.Salary} className='form-control mb-2' name='Salary' onChange={handleChange} required />
             <input type="text" placeholder='Enter Hours per Week' value={inputValues.Hours} className='form-control mb-2' name='Hours' onChange={handleChange} required />
             <input type="text" placeholder='Enter Rate Per Hour' value={inputValues.Rate} className='form-control mb-2' name='Rate' onChange={handleChange} required />
             <textarea className='form-control mb-2' value={inputValues.Skills} placeholder='Enter Skills Notice: if you want line under to line put end of sentence ,' name='Skills' onChange={handleChange} required></textarea>
             <textarea className='form-control mb-2' value={inputValues.Experience} placeholder='Enter Experience Notice: if you want line under to line put end of sentence ,' name='Experience' onChange={handleChange} required></textarea>
          </div>
          <div className='col-md-6'>
           <input type="text" className='form-control mb-2' value={inputValues.Location} placeholder='Location' name='Location' onChange={handleChange} required /> 
           <input type="text" className='form-control mb-2' value={inputValues.Place} placeholder='Place' name='Place' onChange={handleChange} required />
           <label className='mb-2'>Expaired date</label>
           <input type="date" className='form-control mb-2' value={inputValues.Expired_Date} name='Expired_Date' onChange={handleChange} required  />
           <textarea className='form-control mb-2' value={inputValues.Description} placeholder='Enter Description' name='Description' onChange={handleChange} required ></textarea>
           <textarea className='form-control mb-2' value={inputValues.Responsibilities} placeholder='Enter Responsibilities Notice: if you want line under to line put end of sentence ,' name='Responsibilities' onChange={handleChange} required ></textarea>
           <select className='form-control' name='Status' onChange={handleChange} required >
           <option>Choose Status</option>
              <option selected={inputValues.Status=="Active" ? "Selected" : ""}>Active</option>
              <option  selected={inputValues.Status=="Close" ? "Selected" : ""}>Close</option>
           </select>
            </div>
        </div>
        <input type="submit" value="save" className='btn btn-primary'/>
        </form>
    </div>
    
    
       </div>
    
      
           </Content>
        
            </div>
        </div>
        </div>
      )
}

export default EditJob

const Content = styled.div`
     background-color:#e5e5e5; 
     padding:30px;
     .content{
       background-color:#fff;
       border-radius:7px;
       textarea{
         height:150px;
      }
     
    }
`