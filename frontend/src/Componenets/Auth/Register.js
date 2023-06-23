import axios from 'axios';
import React,{useState} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import swal from 'sweetalert';
import { useNavigate } from 'react-router';

function Register() {

  const [who,setWho]=useState("Candidate");
  const [Name,setName] =useState("");
  const [JobTitle,setJobTitle] =useState("");
  const [Phone,setPhone] =useState("");
  const [Email,setEmail] =useState("");
  const [Gender,setGender] =useState("");
  const [birthday,setBirthday] =useState("");
  const [Profile,setProfile]=useState("");
  const [Resume,setResume]=useState("");
  const [Password,setPassword]=useState("");
  const [ValidCandidate,setValidCandidate]=useState([]);
  const [ValidEmpl,setValidEmpl]=useState([]);

  const navigate = useNavigate("");

  const handlProfile = (e) => {

    setProfile(e.target.files[0]);
  }

  const handlwho = (e) => {
     setWho(e)
  }

  const handlSubmit = (e) => {
    e.preventDefault();

    if(who=="Candidate"){
        const dataCandidate = new FormData();
        dataCandidate.append("Name",Name);
        dataCandidate.append("Job",JobTitle);
        dataCandidate.append("Phone",Phone);
        dataCandidate.append("Email",Email);
        dataCandidate.append("Gender",Gender);
        dataCandidate.append("Profile",Profile);
        dataCandidate.append("Resume",Resume);
        dataCandidate.append("Birthday",birthday);
        dataCandidate.append("Password",Password);

      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post("/api/Users",dataCandidate).then(res => {
            if(res.data.status==200){
              swal("Your Account Registred Successfuly!","","success");
              navigate("/login");
            }

            else if(res.data.status==201){
              swal(res.data.message,"","warning")
            }
        }).catch(err => {
          setValidCandidate(err.response.data.errors);
        })
      })
    }
   else if(who=="Employer"){
      const Employer = new FormData();
      Employer.append("Name",Name);
      Employer.append("Phone",Phone);
      Employer.append("email",Email);
      Employer.append("logo",Profile);
      Employer.append("Password",Password);

      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post("/api/RegisterEmp",Employer).then(res => {
          
          if(res.data.status==200){
            swal("Your Account Registred Successfuly!","","success");
            navigate("/login");
          }

          else if(res.data.status==201){
            swal(res.data.message,"","warning")
          }
        }).catch(err => {
            setValidEmpl(err.response.data.errors);
        })
      })
    }
  }

  return (
    <div>
      <Header/>
         <div class="Register">
      <form className='formReg' onSubmit={handlSubmit}>
        <ul className='nav gap-3 justify-content-center mb-3'>
        <li className={`${who == "Candidate" ? "active" : ""}`}  onClick={(e) => handlwho("Candidate")}>I'm a Candidate</li>
            <li className={`${who == "Employer" ? "active" : ""}`} onClick={(e) => handlwho("Employer")}>I'm an Employer</li>
        </ul>
        <h1>Register For {who}</h1>
        {/* EMployer Candidate */}
        <div className='row Candidate'>
          <div className='col-sm-6 col-md-6'>
          <label for="">Full Name</label>
          <input type="text"  placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />
          <div className={`${ValidCandidate?.Name ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Name ? ValidCandidate?.Name : ""}</div>
          <div className={`${ValidEmpl?.Name ? "alert alert-danger p-2" : ""}`}>{ValidEmpl?.Name ? ValidEmpl?.Name : ""}</div>

        <div style={{display:`${who != "Candidate" ? "none" : ""}`}}>
        <label for="">Job Title</label>
        <input type="text"  placeholder="Enter your Job"  onChange={(e) => setJobTitle(e.target.value)} />
        <div className={`${ValidCandidate?.Job ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Job ? ValidCandidate?.Job : ""}</div>
       </div>

        <label for="">Phone</label>
        <input type="text"  placeholder="Enter your Number Phone"  onChange={(e) => setPhone(e.target.value)} />
        <div className={`${ValidCandidate?.Phone ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Phone ? ValidCandidate?.Phone : ""}</div>
        <div className={`${ValidEmpl?.Phone ? "alert alert-danger p-2" : ""}`}>{ValidEmpl?.Phone ? ValidEmpl?.Phone : ""}</div>

        <label for="">Email address</label>
        <input type="email" placeholder="Enter your email address"  onChange={(e) => setEmail(e.target.value)} />
        <div className={`${ValidCandidate?.Email ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Email ? ValidCandidate?.Email : ""}</div>
        <div className={`${ValidEmpl?.email ? "alert alert-danger p-2" : ""}`}>{ValidEmpl?.email ? ValidEmpl?.email : ""}</div>

        <div style={{display:`${who != "Candidate" ? "none" : ""}`}}>
          <label for="">Gender</label>
          <input type="radio" value="Female" name='test' onChange={(e) => setGender(e.target.value)} /> Female 
          <input type="radio" className='ms-3' name='test' value="male" onChange={(e) => setGender(e.target.value)} /> male
          <div className={`${ValidCandidate?.Gender ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Gender ? ValidCandidate?.Gender : ""}</div>
        </div>

          </div>
          <div className='col-sm-6 col-md-6'>
          <div style={{display:`${who != "Candidate" ? "none" : ""}`}}>
        <label for="">date of birthday</label>
        <input type="date" className='form-control mb-3' onChange={(e) => setBirthday(e.target.value)} />
        <div className={`${ValidCandidate?.Birthday ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Birthday ? ValidCandidate.Birthday : ""}</div>
        </div>

        <label for="">Password</label>
        <input type="password"  placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}  />
        <div className={`${ValidCandidate?.Password ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Password ? ValidCandidate?.Password : ""}</div>
        <div className={`${ValidEmpl?.Password ? "alert alert-danger p-2" : ""}`}>{ValidEmpl?.Password ? ValidEmpl?.Password : ""}</div>

        <label for="">Profile</label>
        <input type="file" onChange={handlProfile} className='form-control mb-4' />
        <div className={`${ValidCandidate?.Profile ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Profile ? ValidCandidate?.Profile : ""}</div>
        <div className={`${ValidEmpl?.logo ? "alert alert-danger p-2" : ""}`}>{ValidEmpl?.logo ? ValidEmpl?.logo : ""}</div>

        <div style={{display:`${who != "Candidate" ? "none" : ""}`}}>
        <label for="">Resume</label>
        <input type="file" className='form-control mb-2' onChange={(e) => setResume(e.target.files[0])}  />
        <div className={`${ValidCandidate?.Resume ? "alert alert-danger p-2" : ""}`}>{ValidCandidate?.Resume ? ValidCandidate?.Resume : ""}</div>
       </div>
        </div>
        </div>
        {/* type of login */}
        {/* <input type="text" value={who} /> */}
        {/* EMployer Register */}
      {/* <div className='Employer' style={{display:`${who != "Employer" ? "none" : ""}`}}>
          <label for="">Full Name</label>
          <input type="text" placeholder='FullName' onChange={(e) => setName(e.target.value)} required/>
          <label for="">Phone</label>
        <input type="text"  placeholder="Enter your Number Phone" onChange={(e) => setPhone(e.target.value)} required/>
        <label for="">Email address</label>
        <input type="email" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} required/>
        <label for="">Profile</label>
        <input type="file" className='form-control' onChange={(e) => setProfile(e.target.value)}/>
      </div> */}
        <input type="submit" value="Register" />
      </form>
     </div>
     <Footer/>
    </div>
  )
}

export default Register