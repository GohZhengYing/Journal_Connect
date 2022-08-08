import React,{useState,useEffect} from 'react'
import HomeNavbar from './components/homenavbar/homenavbar'
import HomeContent from './components/homecontent/homecontent'
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'

function Home(){
    const [validUser,setValidUser] = useState(false)
    const [homeComponent,setHomeComponent] = useState(<></>)
    const navigate = useNavigate()
    useEffect(()=>{
        async function auth(){
            const response = await api.get('/account',
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status){
                setValidUser(true)
            }
            else{
                navigate('/login')
            }
            
    validUser? setHomeComponent(<div className='home'>
    <HomeNavbar name={response.data.user.name}/>
    <HomeContent {...response.data}/>
    </div>)
    :setHomeComponent(<div></div>)
        }
        auth()
    },[validUser])
    return(homeComponent)

}

export default Home