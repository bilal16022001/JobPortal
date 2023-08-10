import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import styled from 'styled-components'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Category() {

   const [Category,setCategory]=useState(null);
   const [Categories,setCategories]=useState([]);
   const [error,setError]=useState("");
   const [Auth,setAuth]=useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      getCategory();
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

   const getCategory = () => {
      axios.get("/api/Category").then(res => {
         setCategories(res.data);
   }).catch(err => {
      console.log(err);
   })
   }
   const handlSubmit = (e) => {
      e.preventDefault();

      const data = {
         Name:Category
      }

      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post("/api/Category",data).then(res => {
               window.location.reload(true);               
         }).catch(err => {
            setError(err.response.data.message);
         })
      });
  
   }
   const DeleteCategory = (id) => {
    
       swal({
         title: "Are you sure To Delete This Category?",
         text: "Once deleted, you will not be able to recover this Category !",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
       .then((willDelete) => {
         if (willDelete) {
            swal("Poof! Category has been deleted!", {
               icon: "success",
             }).then(() => {
                
               axios.delete(`/api/Category/${id}`).then(res => {
                  getCategory()
               }).catch(err => {
                  console.log(err);
               })
               })
         
          
         } else {
           swal("Category  is safe!");
         }
       });
   }
   const UpdateCategory = (id) => {
   

      swal({
         title: "Edit Category",
   
         buttons: true,
         dangerMode: true,
         content: {
            element: "input",
            attributes: {
              type: "text",
              value:`${Categories.filter(item => item.id==id).map(it => it.Name)}`,
              id:"inputVal"
            },
          },
       
       })
       .then((willDelete) => {
         if (willDelete) {
            const inputVal = document.getElementById("inputVal").value;
   
           const data = new FormData();
           data.append("Name",inputVal);
           data.append("_method","PATCH");

               axios.post(`/api/Category/${id}`,data).then(res => {
                  if(res.data.status == 200){
                    getCategory();
                  swal("Poof! Category has been Updated!")
                  }
                  console.log(res.data);
               }).catch(err => {
                  console.log(err);
               })
           
         } else {
           swal("Category is safe!");
         }
       });
    
       
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
    <h2 class="text-center mb-4">Manage Jobs Category</h2>
    <div class="">
        <div class="table-responsive">
            <table class="main-table text-center table table-bordered">
                 <tr>
                      <td>#</td>
                      <td>Name Category</td>
                      <td>Action</td>
                </tr>
                  {Categories.map(item => (
                       <tr>
                          <td>{item.id}</td>
                          <td>{item.Name}</td>
                          <td>
                              <a onClick={() => UpdateCategory(item.id)} href='#'><EditIcon/></a>
                              <a onClick={()=>DeleteCategory(item.id)} href='#'><DeleteIcon/></a>
                          </td>
                       </tr>
                       
                  ))}
          </table>
      </div>
  </div>


  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add Job Category
  </button>
  
   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"     aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Job Category</h1>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
        <form onSubmit={handlSubmit}>
            <label className='mb-2'>Job Category</label>
            <input type="text" className='form-control mb-3' onChange={(e) => setCategory(e.target.value)} placeholder='Category Of Job' />
            {/* <div className={`${error.length > 0 ? "alert alert-danger" : ""}`}>{error.length > 0 ? error : ""}</div> */}
            <div className={`${ Category == "" ? "alert alert-danger" : ""}`}>{ Category == "" ? "The name field is required." : ""}</div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <input type="submit" class="btn btn-primary" value="Save" />
           </div>
        </form>
      </div>

</div>
</div>
   </div>

</div>


   </div>

  
       </Content>
    
        </div>
    </div>
    </div>
  )
}

export default Category

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