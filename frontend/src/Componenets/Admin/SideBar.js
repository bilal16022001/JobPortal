import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CommentIcon from '@mui/icons-material/Comment';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import PagesIcon from '@mui/icons-material/Pages';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import swal from 'sweetalert'
import { useNavigate } from 'react-router';


function SideBar() {
  const [Auth,setAuth] = useState(false);
  const navigate = useNavigate();
  const [user,setUser]=useState([]);
  useEffect(() => {

    axios.get("/api/CheckAuth").then(res=> {
      if(res.data.status == 200){
        console.log(res.data.user)
        setUser(res.data.user);
        setAuth(true)
       }else{
        setAuth(false)
       }
})
  return () => {
     setAuth(false);
  }
  },[]);


  const logout = () => {
     axios.post("/api/logoutA").then(res => {
        if(res.data.status==200){
          localStorage.removeItem("auth_token");
             swal(res.data.message,"","success");
             navigate("/Admin");
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
        swal("404 Error","page not found","warning");
        navigate("/Admin")
    }
    return Promise.reject(error)
 }

 )
  return (
    // <Side widthSide={widthSide}>
    <div className="sidebar">
    <div className="all">
    <div className="profile text-center">
               
    <img className='imgProfile' src={`http://localhost:8000/${user.profile}`}  />          
                       <a className="Employer text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome  <span className='nameLogged'></span>{user.Name}</a>
                   <ul className="dropdown-menu dropMenu text-center" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#"><Link to="/Admin/Profile">Profile</Link></a></li>
                      <li><a onClick={logout} className="dropdown-item" href="#">logout</a></li>
                  </ul>

      </div>
  <div className="sidebar-item">
    <i className="fas fa-home"></i>
 <Link to="/Admin/Dashboard"><HomeIcon/></Link> <Link className='itemSide' to="/Admin/Dashboard"><span>Dashboard</span></Link>
  </div>
 
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/Admin/Category"><CategoryIcon/></Link> <Link className='itemSide' to="/Admin/Category">Jobs Category</Link>
  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link to="/Admin/Employers"><PersonIcon/> </Link><Link className='itemSide' to="/Admin/Employers">Employers</Link>
  </div>
  <div className="sidebar-item ">
    <i className="fas fa-cog"></i>
  <PagesIcon/>  <a className="itemSide btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Pages
   </a>
     <ul class="dropdown-menu">
          <li> <ContactPageIcon /> <Link className="dropdown-item itemSide" to="/Admin/Contact">Page Contact</Link></li>
          <li> <ContactPageIcon/> <Link className="dropdown-item itemSide" to="/Admin/About">Page About</Link></li>
    </ul>

  </div>
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Admin/Candidates"> <ArticleIcon/></Link> <Link className='itemSide' to="/Admin/Candidates">Candidates</Link>
  </div> 
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Admin/Reports"><ArticleIcon/></Link> <Link className='itemSide' to="/Admin/Reports">Reports</Link>
  </div> 
  <div className="sidebar-item">
    <i className="fas fa-cog"></i>
    <Link className='' to="/Admin/Search"><SearchIcon/></Link> <Link className='itemSide' to="/Admin/Search">Search</Link>
  </div> 
  </div>
   </div>

  )
}

export default SideBar
