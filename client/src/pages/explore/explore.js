import React,{useState,useEffect} from 'react'
import MainExplore from './components/mainexpolre/mainexplore'
import ExploreNavbar from './components/explorenavbar/explorenavbar'
import ExploreFriend from './components/explorefriend/explorefriend'
import {useNavigate,useParams} from 'react-router-dom'
import api from '../../api/api'

function Explore(){
    const {id} = useParams()
    const [validUser,setValidUser] = useState(false)
    const navigate = useNavigate()
    const [userInfo,setUserInfo] = useState({})
    useEffect(()=>{
        async function validate(){
            const response = await api.get('/account',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status){
                setValidUser(true)
                setUserInfo(response.data.user)
                return
            }
            else{
                navigate('/login')
            }
        }
        validate()
    },[])
    return(<div>
        {validUser? <div><ExploreNavbar/>
        {id?<ExploreFriend id={id}/>:<MainExplore {...userInfo}/>}</div>:<div/>}
    </div>)
}

export default Explore