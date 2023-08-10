import logo from './logo.svg';
import './Componenets/sass/App.css';
import Header from './Componenets/Header';
import Home from './Componenets/Home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AllJobs from './Componenets/AllJobs';
// import Candidate from './Componenets/Candidate/Candidate';
import Register from './Componenets/Auth/Register';
import Login from './Componenets/Auth/Login';
import LoginAdmin from './Componenets/Auth/LoginAdmin';
import About from './Componenets/About';
import Contact from './Componenets/Contact';
import DetailCompany from './Componenets/DetailCompany';
import Blogs from './Componenets/Blogs'
import Blog from './Componenets/Blog';
import axios from 'axios';
import Dashboard from './Componenets/Admin/Dashboard';
import Category from './Componenets/Admin/Category';
import Employers from './Componenets/Admin/Employers';
import EmployerDetail from './Componenets/Admin/EmployerDetail';
import PageContact from './Componenets/Admin/PageContact';
import PageAbout from './Componenets/Admin/PageAbout';
import Candidates from './Componenets/Admin/Candidates';
import DetailCandidate from './Componenets/Admin/DetailCandidate';
import Reports from './Componenets/Admin/Reports';
import Search from './Componenets/Admin/Search';
import DetailRaport from './Componenets/Admin/DetailRaport';
import Dashboard_E from './Componenets/Employer/Dashboard_E';
import PostJob from './Componenets/Employer/PostJob';
import Applications from './Componenets/Employer/Applications';
import Jobs from './Componenets/Employer/Jobs';
import DetailJob from './Componenets/Employer/DetailJob';
import EditJob from './Componenets/Employer/EditJob';
import ShortListed from './Componenets/Employer/ShortListed';
import Reports_E from './Componenets/Employer/Reports_E';
import Profile from './Componenets/Candidate/Profile';
import AppliedJob from './Componenets/Candidate/AppliedJob';
import JobDetail from './Componenets/JobDetail';
import Profile_A from './Componenets/Admin/Profile_A';
import Profile_E from './Componenets/Employer/Profile_E';
import JobsCategory from './Componenets/JobsCategory';

//solve problem CSRF token mismatch
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'multipart/form-data';
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
//access to login
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem("auth_token");
  // const tokenC = localStorage.getItem("auth_token_C");
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  // config.headers.Authorization = tokenC ? `Bearer ${tokenC}` : ``;

  return config;
});






function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/jobs' element={<AllJobs/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/Admin' element={<LoginAdmin/>} />
            <Route path='/About' element={<About/>} />
            <Route path='/Contact' element={<Contact/>} />
            <Route path='/Company/:id' element={<DetailCompany/>} />
            <Route path='/Blogs' element={<Blogs/>} />
            <Route path='/Blog/:id' element={<Blog/>} />
            <Route path='/Job/:id' element={<JobDetail/>} />
            <Route path='/Category/:id' element={<JobsCategory/>} />
         
                <Route path='/Profile' element={<Profile/>} />
                <Route path='/AppliedJob' element={<AppliedJob/>} />
           
            {/* start Module Admin */}
               <Route path='/Admin/Dashboard' element={<Dashboard/>} />
               <Route path='/Admin/Category' element={<Category/>} />
               <Route path='/Admin/Employers' element={<Employers/>} />
               <Route path='/Admin/Employer/:id' element={<EmployerDetail/>} />
               <Route path='/Admin/About' element={<PageAbout/>} />
               <Route path='/Admin/Contact' element={<PageContact/>} />
               <Route path='/Admin/Candidates' element={<Candidates/>} />
               <Route path='/Admin/Candidate/:id' element={<DetailCandidate/>} />
               <Route path='/Admin/Reports' element={<Reports/>} />
               <Route path='/Admin/Search' element={<Search/>} />
               <Route path='/Admin/Report/role=/:role&/from/:from&to/:to' element={<DetailRaport/>} />
               <Route path='/Admin/Profile' element={<Profile_A/>} />

             {/* end Module Admin */}

              {/* start Module Employer */}
              <Route path='/Employer/Dashboard' element={<Dashboard_E/>} />
              <Route path='/Employer/Post' element={<PostJob/>} />
              <Route path='/Employer/Jobs' element={<Jobs/>} />
              <Route path='/Employer/Job/:id' element={<DetailJob/>} />
              <Route path='/Employer/Edit/:id' element={<EditJob/>} />
              <Route path='/Employer/Applications' element={<Applications/>} />
              <Route path='/Employer/ShortListed' element={<ShortListed/>} />
              <Route path='/Employer/Reports' element={<Reports_E/>} />
              <Route path='/Employer/Profile' element={<Profile_E/>} />

               {/* end Module Employer */}

               
         </Routes>
      </Router>
    </div>
  );
}

export default App;
