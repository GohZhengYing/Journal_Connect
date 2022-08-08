import React,{useState,useEffect} from 'react'
import './myfriends.css'
import CircularProgress from '@mui/material/CircularProgress'
import api from '../../../../../api/api'

function MyFriends(props){
    const [friends,setFriends] = useState([])
    const [updated,setUpdated] = useState(false)
    useEffect(()=>{
        async function fetchFriends(){
            const response = await api.get('/account',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            setFriends(response.data.friends)
            setUpdated(false)
        }
        fetchFriends()
    },[updated])
    function handleDeleteFriend(e){
        async function deleteFriends(){
            const response = await api.delete('/friend',{
                data:{id:e.target.id},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            setUpdated(true)
        }
        deleteFriends()
    }
    return(<div className='my_friends'>
        {friends.map((friend)=>{
            return(
                <div className='friend' key={friend._id}>{friend.name}<p>Username: {friend.username}</p><i className='fa fa-minus' id={friend._id} onClick={handleDeleteFriend}></i></div>
            )
        })}
        {updated?<CircularProgress/>:friends.length===0?<h3>No Friends</h3>:<></>}
    </div>)
}

export default MyFriends