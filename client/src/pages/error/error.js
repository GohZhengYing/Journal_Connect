import React from 'react'
import {useNavigate} from 'react-router-dom'
import './error.css'

function Error(){
    const navigateToHome = useNavigate()
    function handleBackButton(){
        navigateToHome('/home')
    }
    return(
        <div className='error_page'>
            <h1>Oops</h1>
            <h3>The page you are looking for does not exist</h3>
            <button onClick={handleBackButton}>Back To Home Page</button>
        </div>
    )
}

export default Error