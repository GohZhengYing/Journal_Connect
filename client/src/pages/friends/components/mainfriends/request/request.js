import React,{useState,useEffect} from 'react'
import './request.css'
import api from '../../../../../api/api'

function Request(){
    const [sentList,setSentList] = useState([])
    const [pendingList,setPendingList] = useState([])
    const [friendsList,setFriendsList] = useState([])
    const [updated,setUpdated] = useState(false)
    useEffect(()=>{
        async function findFriends(){
            const response = await api.get('/friend/',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            const {sent_id,pending_id} = response.data.user
            setPendingList(pending_id)
            setSentList(sent_id)
            setFriendsList(response.data.friends)
        }
        findFriends()
        setUpdated(false)

    },[updated])
    function handleCancelRequest(e){
        async function cancelRequest(){
            const response = await api.patch('/friend/',{type:"sent",id:e.target.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
        }
        cancelRequest()
        setUpdated(true)
    }
    function handleAcceptRequest(e){
        async function acceptRequest(){
            const response = await api.patch('/friend/',{type:"pending",id:e.target.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
        }
        acceptRequest()
        setUpdated(true)
    }
    function handleRejectRequest(e){
        async function rejectRequest(){
            const response = await api.patch('/friend/',{type:"pendingReject",id:e.target.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
        }
        rejectRequest()
        setUpdated(true)
    }
    return(<div className='request'>
        <div className='request_title'>Sent</div>
        <div className='request_section'>
            {friendsList.map((friend)=>{
                if(sentList.includes(friend._id))
                return(
                    <div className='request_friend' key={friend._id}>{friend.name}<p>Username: {friend.username}</p><i className='fa fa-minus' id={friend._id} onClick={handleCancelRequest}></i></div>
                )
            })}
        </div>
        <div className='request_title'>Pending</div>
        <div className='request_section'>
        {friendsList.map((friend)=>{
                if(pendingList.includes(friend._id))
                return(
                    <div className='request_friend' key={friend._id}>{friend.name}<p>Username: {friend.username}</p>
                        <div className='request_section_yn'>
                            <i className='fa fa-circle-check' id={friend._id} onClick={handleAcceptRequest}></i>
                        </div>
                            <i className='fa fa-circle-xmark' id={friend._id} onClick={handleRejectRequest}></i>
                    </div>
                )
            })}
        </div>
    </div>)
}

export default Request