import React, { useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import swal from 'sweetalert';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
  const [who,setWho]=useState("Employer");
  const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
    
  const handlwho = (e) => {
    setWho(e)
 }
    const navigate = useNavigate();

  const handlSubmit = (e) => {
    e.preventDefault();
     if(who=="Employer"){
      const data = {
        email:email,
        password:password
      }
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post("/api/login_E",data).then(res => {
            if(res.data.status == 200){
             window.localStorage.setItem("auth_token",res.data.token);
             navigate("/Employer/Dashboard");
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
       if(who == "Candidate"){
        const data = {
          email:email,
          password:password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.post("/api/loginU",data).then(res => {

              if(res.data.status == 200){
               window.localStorage.setItem("auth_token_C",res.data.token);
               navigate("/");
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
  }

  return (
    <div>
      <Header/>
      <div class="login">
      <form className='formLogin' onSubmit={handlSubmit}>
        <ul className='nav gap-3 justify-content-center mb-3'>
            <li className={`${who == "Employer" ? "active" : ""}`} onClick={(e) => handlwho("Employer")}>I'm an Employer</li>
            <li className={`${who == "Candidate" ? "active" : ""}`}  onClick={(e) => handlwho("Candidate")}>I'm a Candidate</li>
        </ul>
        <h1>Login For {who}</h1>
        <label htmlFor="email">Email address</label>
        <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" required/>
        <input type="hidden" value={who} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />

        <input type="submit" value="Login" />
      </form>
     </div>
     <Footer/>
    </div>
    
  )
}

export default Login