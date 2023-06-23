import React from 'react'
import process1 from '../Componenets/images/process1.png'
import process2 from '../Componenets/images/process-2.png'
import process3 from '../Componenets/images/process-3.png'

function HowWork() {
  return (
    <div>
        <div className='text-center mb-5'>
            <h2>How It Works?</h2>
            <p>Job for anyone, anywhere</p>
        </div>
        <div className='row text-center'>
            <div className='col-md-4 col-sm-6 mb-3'>
                <img className='mb-3' src={process1} />
                <h3>Register an account <br/> to start</h3>
            </div>
            <div className='col-md-4 col-sm-6 mb-3'>
                <img className='mb-3' src={process2} />
                <h3>Explore over thousands <br/> of resumes</h3>
            </div>
            <div className='col-md-4 col-sm-6 mb-3'>
                <img className='mb-3' src={process3} />
                <h3>Find the most suitable <br/> candidate</h3>
            </div>
        </div>
    </div>
  )
}

export default HowWork