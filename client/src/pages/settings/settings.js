import React,{useState,useEffect} from 'react'
import SettingsNavbar from './components/settingsnavbar/settingsnavbar'
import MainSettings from './components/mainsettings/mainsettings'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'

function Settings(){
    const [validUser,setValidUser] = useState(false)
    const [userInfo,setUserInfo] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        async function validate(){
            const response = await api.post('/authenticate',{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status){
                setUserInfo(response.data.user)
                setValidUser(true)
                return
            }
            else{
                navigate('/login')
            }
        }
        validate()
    },[])
    return(<div>
        {validUser?<div>
        <SettingsNavbar/>
        <MainSettings {...userInfo}/></div>:<div/>}
    </div>)
}

export default Settings