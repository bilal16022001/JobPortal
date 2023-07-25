import React,{useEffect, useState} from 'react'
import SideBar_E from './SideBar_E'
import styled from 'styled-components';
import axios from 'axios';
import {fetchCategories} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router';
import swal from 'sweetalert'

function PostJob() {

  const [Auth,setAuth] = useState(false);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.Data.Categories);
  const [UserId,setUserId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    
   dispatch(fetchCategories());
     axios.get("/api/CheckEmployer").then(res=> {
            if(res.data.status == 200){
              setUserId(res.data.user.id);
              setAuth(true)
             }else{
              setAuth(false)
             }
         })
  
        return () => {
           setAuth(false);
        }
  },[]);
  
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
    Company_id:UserId

}); 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    }));
    };

    const handlJob = (e) => {
        e.preventDefault();
        
        axios.post("/api/Job",inputValues).then(res => {
          if(res.data.status == 200){
            swal("Post Added Successfully!","","success");
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
        <h2 class="mb-4">Add job</h2>
        <form onSubmit={handlJob}>
        <div className='row'>
          <div className='col-md-6'>
             <input type="text" placeholder='Enter Job Title' className='form-control mb-2' name='Job' onChange={handleChange}   />
             <select className='mb-2 form-control'  name='Category_id' onChange={handleChange}  >
                <option>choose Category</option>
                {categories?.map(item => (
                 <option value={item.id}>{item.Name}</option>
                ))}
             </select>
             <select className='mb-2 form-control'  name='Type' onChange={handleChange}  >
                <option>choose Type Job</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Mid-level Senior">Mid-level Senior</option>
                <option value="Senior">Senior</option>
             </select>
             <input type="text" placeholder='Enter Level' className='form-control mb-2' name='Level' onChange={handleChange}  />
             <input type="text" placeholder='Enter Salary' className='form-control mb-2' name='Salary' onChange={handleChange}  />
             <input type="text" placeholder='Enter Hours per Week' className='form-control mb-2' name='Hours' onChange={handleChange}  />
             <input type="text" placeholder='Enter Rate Per Hour' className='form-control mb-2' name='Rate' onChange={handleChange}  />
             <textarea className='form-control mb-2' placeholder='Enter Skills Notice: if you want line under to line put end of sentence ,' name='Skills' onChange={handleChange} ></textarea>
             <textarea className='form-control mb-2' placeholder='Enter Experience Notice: if you want line under to line put end of sentence ,' name='Experience' onChange={handleChange} ></textarea>
          </div>
          <div className='col-md-6'>
           <input type="text" className='form-control mb-2' placeholder='Location' name='Location' onChange={handleChange}  /> 
           <input type="text" className='form-control mb-2' placeholder='Place' name='Place' onChange={handleChange}  />
           <label className='mb-2'>Expaired date</label>
           <input type="date" className='form-control mb-2' name='Expired_Date' onChange={handleChange}   />
           <textarea className='form-control mb-2' placeholder='Enter Description' name='Description' onChange={handleChange}  ></textarea>
           <textarea className='form-control mb-2' placeholder='Enter Responsibilities Notice: if you want line under to line put end of sentence ,' name='Responsibilities' onChange={handleChange}  ></textarea>
           <select className='form-control' name='Status' onChange={handleChange}  >
           <option>Choose Status</option>
              <option>Active</option>
              <option>Close</option>
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

export default PostJob

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