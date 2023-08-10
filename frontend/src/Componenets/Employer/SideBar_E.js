
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
import SummarizeIcon from '@mui/icons-material/Summarize';
import swal from 'sweetalert'
import { useNavigate } from 'react-router';

function SideBar_E() {

  const [Auth,setAuth] = useState(false);
  const navigate = useNavigate();
  const [user,setUser]=useState([]);
  useEffect(() => {

    axios.get("/api/CheckEmployer").then(res=> {
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
     axios.post("/api/logoutE").then(res => {
        if(res.data.status==200){
          localStorage.removeItem("auth_token");
             swal(res.data.message,"","success");
             navigate("/login");
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
        swal("404 Error","page not found","warning");
        navigate("/login")
    }
    return Promise.reject(error)
 }

 )
    return (
        // <Side widthSide={widthSide}>
        <div className="sidebar">
        <div className="all">
        <div className="profile text-center">
                   
                       <img className='imgProfile' src={`http://localhost:8000/${user.logo}`}  />          
                       <a className="Employer text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome  <span className='nameLogged'></span>{user.Name}</a>
                       <ul className="dropdown-menu dropMenu text-center" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="#"><Link to="/Employer/Profile">Profile</Link></a></li>
                          <li><a onClick={logout} className="dropdown-item" href="#">logout</a></li>
                      </ul>
    
          </div>
      <div className="sidebar-item">
        <i className="fas fa-home"></i>
     <Link to="/Employer/Dashboard"><HomeIcon/></Link> <Link className='itemSide' to="/Employer/Dashboard"><span>Dashboard</span></Link>
      </div>
     
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Employer/Post"><CategoryIcon/></Link> <Link className='itemSide' to="/Employer/Post">Post Job</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link to="/Employer/jobs"><PersonIcon/> </Link><Link className='itemSide' to="/Employer/jobs">Manage Jobs</Link>
      </div>
      <div className="sidebar-item">
        <i className="fas fa-cog"></i>
        <Link className='' to="/Employer/Applications"> <ArticleIcon/></Link> <Link className='itemSide' to="/Employer/Applications">Applications</Link>
      </div> 
      <div className="sidebar-item">
      <i className="fas fa-cog"></i>
        <Link className='' to="/Employer/ShortListed"><ArticleIcon/></Link> <Link className='itemSide' to="/Employer/ShortListed">ShortListed</Link>
      </div> 
      <div className="sidebar-item">
        {/* <i className="fas fa-cog"></i> */}
        <Link className='' to="/Employer/Reports"><SummarizeIcon/></Link> <Link className='itemSide' to="/Employer/Reports">Reports</Link>
      </div> 
      </div>
       </div>
    
      )
}

export default SideBar_E