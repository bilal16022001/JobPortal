import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import swal from 'sweetalert';


function Header() {
 const navigate= useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    axios.post("/api/logout").then(res => {
           if(res.data.status==200){
            localStorage.removeItem("auth_token_C");
             swal(res.data.message,"","success");
             navigate("/")
          }
    }).catch(err => {
       console.log(err);
    })
  
  }
  return (
    <div className='parentHeader'>
    <nav class="Header navbar position-fixed w-100 navbar-expand-lg bg-light">
  <div class="container-fluid">
    <h3 class="navbar-brand"><Link className='nav-link' to='/'>Job Portal</Link></h3>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto  mb-2 mb-lg-0">
        
      </ul>
      <div class="d-flex">
      <ul class="navbar-nav me-auto  mb-2 mb-lg-0">
    
          <li className='nav-item'><Link className='nav-link' to='/'>Home</Link></li>
          <li className='nav-item'><Link className='nav-link' to='/jobs'>Jobs</Link></li>
         {!localStorage.getItem("auth_token_C") ?
              <>  
                  <li className='nav-item'><Link className='nav-link' to='/login'>login</Link></li> 
                  <li className='nav-item'><Link className='nav-link' to='/register'>Register</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/Admin'>Admin</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/About'>About Us</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/Contact'>Contact Us</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/Blogs'>Blogs</Link></li>
             </>

             : 
                <>
                <li className='nav-item'><Link className='nav-link' to='/AppliedJob'>Applied Jobs</Link></li>
                <li>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <MenuItem onClick={handleClose}>
        <Avatar />   <Link to="/Profile">My account</Link>
        </MenuItem>
        <Divider />
       
        <MenuItem onClick={handleClose}>
          <ListItemIcon onClick={logout}>
            <Logout fontSize="small" /> <span className='ms-2'>logout</span> 
          </ListItemIcon>
          
        </MenuItem>
      </Menu>
      </li>       
                </> 
                
              }

           
          
        </ul>
      </div>
    </div>
  </div>
</nav>

</div>
  )
}

export default Header
