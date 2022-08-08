import React from 'react'
import { useNavigate } from 'react-router-dom'
import './friendslist.css'

function FriendsList(props){
    const navigate = useNavigate()
    function handleFriendsListManage(){
        navigate('/friends')
    }
    function handleFriendsPost(e){
        navigate('/explore/'+e.target.id)
    }
    return(<div className='friends_list'>
        <div className='friends_list_title'>Friends</div>
        <div className='main_list'>
            {props.friends.map((friend)=>{
                return(
                    <button className='main_list_friend' key={friend._id} id={friend._id} onClick={handleFriendsPost}>{friend.name}</button>
                )
            })}
            {props.friends.length===0?<h3>No Friends</h3>:<></>}
        </div>
        <button className='friends_list_button' onClick={handleFriendsListManage}>Manage</button>
        <br></br>
    </div>)
}

export default FriendsList