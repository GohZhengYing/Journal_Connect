import React from 'react'
import Navbar from './components/navbar/navbar'
import MainLogin from './components/mainlogin/mainlogin'

function Login(){
    return(
        <div className='login'>
            <Navbar/>
            <MainLogin/>
        </div>
    )
}

export default Login