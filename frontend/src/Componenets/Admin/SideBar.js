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

function SideBar() {
 
  return (
    // <Side widthSide={widthSide}>
    <div className="sidebar">
    <div className="all">
    <div className="profile text-center">
               
                   {/* <Img className='imgProfile' src={ImgP} />           */}
                   {/* <a className="admin text-white dropdown-toggle d-block " dropdown-toggle href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">welcome  <span className='nameLogged'>{Name}</span></a> */}
                   <ul className="dropdown-menu dropMenu text-center" aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item" href="#"><Link to="/Profile">Profile</Link></a></li>
                      <li><a className="dropdown-item" href="#">logout</a></li>
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
