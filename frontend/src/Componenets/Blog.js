import React from 'react'
import Header from './Header'
import blog1 from '../Componenets/images/blog.jpg'
import Footer from './Footer'

function Blog() {
  return (
    <div>
        <Header/>
        <div className='container p-3'>
            <h3>Attract Sales And Profits toward the sunshine - and shadows will fall behind you.</h3>
            <span className='d-block mb-2'>Alison August 31, 2021</span>
            <img className='mb-2 w-100' src={blog1} />
            <p>lorem lorem lorem ipsum orem lorem lorem ipsum v orem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsum</p>
            <h2>1-First</h2>
            <p>lorem lorem lorem ipsum orem lorem lorem ipsum v orem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsum</p>
            <h2>2-second</h2>
            <p>lorem lorem lorem ipsum orem lorem lorem ipsum v orem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsum</p>
            <h2>3-Third</h2>
            <p>lorem lorem lorem ipsum orem lorem lorem ipsum v orem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsumorem lorem lorem ipsum</p>
        </div>
        <Footer/>
    </div>
  )
}

export default Blog