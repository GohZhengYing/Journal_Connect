import React from 'react'
import './settingsnavbar.css'
import {useNavigate} from 'react-router-dom'

function SettingsNavbar(){
    const navigate = useNavigate()
    function handleNavigateHomeOnClick(){
        navigate('/home')
    }
    return(
        <div className='settings_navbar'>
            <div className='settings_navbar_logo'><img src="./navbar_logo.png" onClick={handleNavigateHomeOnClick}></img></div>
        </div>
    )
}

export default SettingsNavbar