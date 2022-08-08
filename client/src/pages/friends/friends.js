import React,{useState,useEffect} from 'react'
import FriendsNavbar from './components/friendsnavbar/friendsnavbar'
import MainFriends from './components/mainfriends/mainfriends'
import {useNavigate} from 'react-router-dom'
import api from '../../api/api'

function Friends(){
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
        <FriendsNavbar/>
        <MainFriends {...userInfo}/></div>:<></>}
    </div>)
}

export default Friends