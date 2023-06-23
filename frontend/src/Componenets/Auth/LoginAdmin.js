import axios from 'axios';
import React, { useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

function LoginAdmin() {
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
    const navigate = useNavigate();

	const handlLogin = (e) => {
		e.preventDefault();
	    const data = {
			email:email,
			password:password
		}
		axios.get('/sanctum/csrf-cookie').then(response => {
		axios.post("/api/login",data).then(res => {
		    if(res.data.status == 200){
			   window.localStorage.setItem("auth_token",res.data.token);
			   navigate("/Admin/Dashboard");
			   swal("login Successfully!","","success");
			}
			else{
			   swal("Email Or Password Incorrect","","warning")
			 }
		}).catch(err => {
		   console.log(err);
		})
	   })
	}
  return (
    <div>
        <Header/>
        <div class="loginAdmin">
		<form onSubmit={handlLogin}>
		<h2 className='text-center mb-3'>Login Admin</h2>
		<label>Email:</label>
		<input type="email" placeholder='your Email' onChange={(e) => setEmail(e.target.value)}  required />
		<label>Password:</label>
		<input type="password"  placeholder='your Password'  onChange={(e) => setPassword(e.target.value)}  required />
		<input type="submit" value="Login" />
	</form>
	</div>
        <Footer/>
    </div>
  )
}

export default LoginAdmin