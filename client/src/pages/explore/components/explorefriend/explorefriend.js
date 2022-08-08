import React,{useEffect, useState} from 'react'
import './explorefriend.css'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate} from 'react-router-dom'
import api from '../../../../api/api'

function ExploreFriend(props){
    const [friendsPost,setFriendsPost] = useState([])
    const [friendsName,setFriendsName] = useState("")
    const [userDNE,setUserDNE] = useState(false)
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchPosts(){
            const response = await api.patch('/post',{id:props.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status)
            {setFriendsPost(response.data.posts)
            setFriendsName(response.data.name)}
            else
            setUserDNE(true)
            setLoading(false)
        }
        fetchPosts()
        

    },[])
    function changeDateToLetter(oldDate){
        if(oldDate!=="")
        {let [year,month,day] = oldDate.split('-')
        const months = [" Jan "," Feb "," Mar "," Apr "," May "," Jun "," Jul "," Aug "," Sep "," Oct "," Nov "," Dec "]
        months.map((m,index)=>{if(index===Number(month)-1)month=m})
        return day+month+year}
    }
    function backToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }
    function handleBackOnClick(){
        navigate(-1)
    }
    function backToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }
    return(<div className='explore_friend'>
        <i className='fa fa-circle-up' onClick={backToTop}></i>
        <div className='explore_friend_wrapper'>
        <div className='explore_friend_back'><i className='fa fa-arrow-left' onClick={handleBackOnClick}></i></div>
        {loading?<CircularProgress/>:userDNE?<div className='explore_dne'>This user does not exist</div>:<div className='explore_friend_posts'>
            <div className='explore_friend_posts_title'>{friendsName}'s Posts</div>
            {friendsPost.map((post)=>{
                return(
                    <div className='feed_post' key={post._id}>
                        <div className='feed_post_image_wrapper'><img className='feed_post_image' src={post.image}></img></div>
                        <div className='feed_post_date'>{changeDateToLetter(post.date)}</div>
                        <div className='feed_post_description'>
                        {post.description}
                        </div>
                    </div>

                )
            })}
        </div>}
        </div>
    </div>)
}

export default ExploreFriend