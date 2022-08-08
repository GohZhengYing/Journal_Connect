import React from 'react'
import './friendsnavbar.css'
import {useNavigate} from 'react-router-dom'

function FriendsNavbar(){
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
        <div className='friends_navbar'>
            <div className='friends_navbar_logo'><img src="./navbar_logo.png" onClick={handleNavigateHomeOnClick}></img>
            <div className='friends_navbar_settings'>
                <i className='fa fa-gear'></i>
                <div className='friends_navbar_dropdown'>
                    <a onClick={handleSettings}>Account Settings</a>
                    <a onClick={handleLogout}>Logout</a>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default FriendsNavbar