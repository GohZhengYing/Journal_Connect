import React from 'react'
import './explorenavbar.css'
import {useNavigate} from 'react-router-dom'

function ExploreNavbar(){
    const navigate = useNavigate()
    function handleNavigateHomeOnClick(){
        navigate('/home')
    }
    function handleLogout(){
        localStorage.clear()
        navigate('/login')
    }
    function handleSettings(){
        navigate('/settings')
    }
    return(
        <div className='explore_navbar'>
            <div className='explore_navbar_logo'><img src="/navbar_logo.png" onClick={handleNavigateHomeOnClick}></img>
            <div className='explore_navbar_settings'>
                <i className='fa fa-gear'></i>
                <div className='explore_navbar_dropdown'>
                    <a onClick={handleSettings}>Account Settings</a>
                    <a onClick={handleLogout}>Logout</a>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default ExploreNavbar