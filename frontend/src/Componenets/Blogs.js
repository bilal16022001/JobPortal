import React from 'react'
import Header from './Header'
import blog1 from '../Componenets/images/blog.jpg'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Blogs() {
  return (
    <div>
        <Header/>
        <div className='Blogs p-4'>
        <div className='container'>
            <div className='title text-center mb-3'>
                <h2>Recent News Articles</h2>
                <p>Fresh job related news content posted each day.</p>
            </div>
            <div className='row'>
                <div className='col-md-4 mb-3'>
                    <img className='mb-2' src={blog1} />
                    <p>August 31, 2021</p>
                    <h3>Attract Sales And Profits</h3>
                    <p>A job ravenously while Far much that one rank beheld after outside</p>
                    <Link to="/Blog/1">Read More <ChevronRightIcon/></Link>
                </div>
                <div className='col-md-4 mb-3'>
                    <img className='mb-2' src={blog1} />
                    <p>August 31, 2021</p>
                    <h3>Attract Sales And Profits</h3>
                    <p>A job ravenously while Far much that one rank beheld after outside</p>
                    <a>Read More <ChevronRightIcon/></a>
                </div>
                <div className='col-md-4 mb-3'>
                    <img className='mb-2' src={blog1} />
                    <p>August 31, 2021</p>
                    <h3>Attract Sales And Profits</h3>
                    <p>A job ravenously while Far much that one rank beheld after outside</p>
                    <a>Read More <ChevronRightIcon/></a>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Blogs