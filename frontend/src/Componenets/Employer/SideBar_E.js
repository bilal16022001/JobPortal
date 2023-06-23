
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

function SideBar_E() {
    return (
        // <Side widthSide={widthSide}>
        <div className="sidebar">
        <div className="all">
        <div className="profile text-center">
                   
                       {/* <Img className='imgProfile' src={ImgP} />           */}
                       {/* <a className="Employer text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome  <span className='nameLogged'>{Name}</span></a> */}
                       <ul className="dropdown-menu dropMenu text-center" aria-labelledby="navbarDropdown">
                          <li><a className="dropdown-item" href="#"><Link to="/Profile">Profile</Link></a></li>
                          <li><a className="dropdown-item" href="#">logout</a></li>
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