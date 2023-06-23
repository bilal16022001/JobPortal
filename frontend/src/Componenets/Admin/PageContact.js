import React,{useState,useEffect} from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import axios from 'axios';
import swal from 'sweetalert';
import {useNavigate} from 'react-router'

function PageContact() {
  const [Address,setAddress]=useState("");
  const [Phone,setPhone]=useState("");
  const [Email,setEmail]=useState("");
  const [Auth,setAuth]=useState(false);
  const navigate = useNavigate();
    useEffect(() => {

      axios.get("/api/CheckAuth").then(res=> {
        if(res.data.status == 200){
          console.log(res.data.message);
          setAuth(true)
         }else{
          setAuth(false)
         }
     })

    return () => {
       setAuth(false);
    }
    },[])
  useEffect(() => {

    axios.get("api/Contact").then(res => {
      setAddress(res.data.Address);
      setPhone(res.data.Phone);
      setEmail(res.data.Email);

    }).catch(err => {
       console.log(err);
    });


  },[]);

  const handlContact = (e) => {
    e.preventDefault();
      const data = new FormData();
      data.append("Address",Address);
      data.append("Phone",Phone);
      data.append("Email",Email);

      axios.post("api/Contact",data).then(res => {
            console.log(res.data);
            if(res.data.status == 200){
              swal("Poof! data added successfully!","","success");
            }
            else if(res.data.status == 201){
              swal("Poof! data updated successfully!","","success");
            }
      }).catch(err => {
        console.log(err);
      })
   }
   axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    if(err.response.status==401){
       swal("Unauthorized",err.response.data.message,"warning")
       navigate("/Admin")
     }
     
     return Promise.reject(err)
})

axios.interceptors.response.use(function(response){
    return response;
},function(error){
   if(error.response.status==403){
    swal("Forbidden",error.response.data.message,"warning");
    navigate("/Admin")
    }
    else if(error.response.status==404){
        swal("404 Error","page not f-ond","warning");
        navigate("/Admin")
    }
    return Promise.reject(error)
 }

)
  return (
    <div>
    <div className='d-flex'>
    <SideBar/>
    <div className='w-100'>
    <Content className=''>
<div className='content'>
  <div class="parent p-3">
<h2 class="mb-4">Edit Page Contact</h2>
  <div>
    <form onSubmit={handlContact}>
       <label className='mb-2'>Address</label>
       <input className='form-control mb-3' type="text" onChange={(e) => setAddress(e.target.value)} value={Address} />
       <label className='mb-2'>Phone</label>
       <input className='form-control mb-3' type="text" onChange={(e) => setPhone(e.target.value)} value={Phone} />
       <label className='mb-2'>Email</label>
       <input className='form-control mb-3' type="email" onChange={(e) => setEmail(e.target.value)} value={Email} />
       <input className='btn btn-primary' type="submit" value="update" />
    </form>
  </div>
</div>
</div>

   </Content>

    </div>
</div>
</div>
  )
}

export default PageContact


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