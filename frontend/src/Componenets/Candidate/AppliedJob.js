import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {useNavigate} from 'react-router'
import axios from 'axios'
import swal from 'sweetalert';
import logoCom from '../images/logoC.png'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {fetchApplications} from '../Redux-toolkit/Slice'
import {useDispatch,useSelector} from 'react-redux'

function AppliedJob() {
  
    const [Auth,setAuth]=useState(false);
    const navigate = useNavigate();
    const [data,setData] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {

        axios.get("/api/CheckCnadidate").then(res=> {
          if(res.data.status == 200){
            setAuth(true)
           }else{
            setAuth(false)
           }
       })
      //  dispatch(fetchApplications())
       fetchAppliedJobs()
      return () => {
         setAuth(false);
      }  

      },[])

const fetchAppliedJobs = () => {
    axios.get("/api/AppliedJobs").then(res => {
          console.log(res.data);
          setData(res.data);
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
    <div>
         <Header/>
         <div className='container p-3'>
          <h3 className='mb-3'>You Applied Job</h3>
          <div className='row'>
            {data.length > 0 ? data.map(item => (
              <div className='col-sm-6 col-md-6'>
              <div className='border border-3 border-solid p-3'>
              <div className='logoCompany mb-3'>
                <img src={logoCom} />
              </div>
              <div className='job'>
                <h4 className='mb-2'>{item.job.Job}</h4>
                <ul className='InfoJob mb-2 nav gap-4'>
                    <li className=''>
                        <BusinessCenterIcon/> 
                        {item.job.company.Name}
                    </li>
                    <li>
                        <LocationOnIcon/>
                        {item.job.Location} ({item.job.Place})
                    </li>
                    <li>
                        <QueryBuilderIcon/>
                        11 hours ago
                    </li>
                    <li>
                        <AttachMoneyIcon/>
                        {item.job.Salary}
                    </li>
                </ul>
                <ul className='OtherInfoJb nav gap-4'>
                    <li className='type p-1 pe-3 ps-3'>

                      {item.job.Type}
                    </li>
                    <li className='urgent p-1 pe-3 ps-3'>
                    {item.job.Status}

                    </li>
                </ul>
              </div>
              </div>
          </div> 
            )) : <div className='alert alert-info'>There no Applied job</div>}
          
             
            </div>
         </div>
          <Footer/>
    </div>
  )
}

export default AppliedJob