import React,{useState,useEffect} from 'react'
import './feed.css'
import api from '../../../../../api/api'
import CircularProgress from '@mui/material/CircularProgress'


function Feed(props){
    const [feedPosts,setFeedPosts] = useState([])
    const [feedPostsName,setFeedPostsName] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        async function fetchPosts(){
            const response = await api.get('/post',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            
            setFeedPosts(response.data.posts)
            setFeedPostsName(response.data.names)
            setLoading(false)
        }
        fetchPosts()
        
    },[])
    return(<div className='feed'>
                {loading?<CircularProgress/>:feedPosts.length===0?<div><h3>No posts<br/>Follow others to get recommended posts</h3></div>:<div className='feed_posts'>
                {feedPosts.map((post,id)=>{
                    return(<div key={post._id}>
                        <div className='feed_post_name'>{feedPostsName[id]}</div>
                        <div className='feed_post'>
                            <i className='fa fa-ellipsis'></i>
                            <div className='feed_post_image_wrapper'><img className='feed_post_image' src={post.image}></img></div>
                            <div className='feed_post_'>{props.change(post.date)}</div>
                            <div className='feed_post_description'>
                                {post.description}
                            </div>
                        </div>
                        </div>
                    )
                })}
        </div>}
    </div>)
}

export default Feed