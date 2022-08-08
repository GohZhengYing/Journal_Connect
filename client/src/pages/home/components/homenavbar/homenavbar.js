import React from 'react'
import { useNavigate } from 'react-router-dom'
import './homenavbar.css'

function HomeNavbar(props){
    const navigate = useNavigate()
    function handleHome(){
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
        <div className='home_navbar'>
            <div className='home_navbar_logo'><img src="./navbar_logo.png" onClick={handleHome}></img>
            <div className='home_navbar_name'>UsernameKuckc</div>
            
            <div className='home_navbar_settings'>
                <i className='fa fa-gear'></i>
                <div className='home_navbar_dropdown'>
                    <a onClick={handleSettings}>Account Settings</a>
                    <a onClick={handleLogout}>Logout</a>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default HomeNavbar