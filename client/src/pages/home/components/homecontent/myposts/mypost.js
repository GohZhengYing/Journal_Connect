import React,{useState,useEffect} from 'react'
import api from '../../../../../api/api'
import './mypost.css'
import CircularProgress from '@mui/material/CircularProgress'
import NewPost from '../newpost/newpost'
import { useNavigate } from 'react-router-dom'

function MyPost(props){
    const [posts,setPosts] = useState([])
    const [updated,setUpdated] = useState(true)
    const [editPostInput,setEditPostInput] = useState({
        edit:false,
        image:"",
        date:"",
        description:"",
        _id:""
    })
    const navigate = useNavigate()
    useEffect(()=>{
        async function fetchPosts(){
            const respond = await api.get('/post/1',{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            setPosts(respond.data.posts)
            setUpdated(false)
        }
    fetchPosts()
        
        props.setPosted(false)
    },[updated,props.posted])
    function handleExploreOnClick(){
        navigate('/explore')
    }
    function changeDateToLetter(oldDate){
        if(oldDate!=="")
        {let [year,month,day] = oldDate.split('-')
        const months = [" Jan "," Feb "," Mar "," Apr "," May "," Jun "," Jul "," Aug "," Sep "," Oct "," Nov "," Dec "]
        months.map((m,index)=>{if(index===Number(month)-1)month=m})
        return day+month+year}
    }
    function handleEditPost(e){
        let post = posts.find((post)=>post._id===e.target.id)
        setEditPostInput({...post,edit:true})
    }
    function handleExitEditPost(){
        setEditPostInput({...editPostInput,edit:false})
        setUpdated(true)
    }
    function handleDeletePost(e){
        async function deletePost(){
            const respond = await api.delete(`/post/${e.target.id}`,{
                data:{},
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
        }
        deletePost()
        setUpdated(true)
    }
    return(<div className='my_post'>
        {editPostInput.edit? 
            <div className='edit_post' style={{display:`${editPostInput.edit?"flex":"none"}`}}>
                <div className='edit_post_wrapper'>
                    <NewPost 
                    edit={true}
                    id={editPostInput._id}
                    image={editPostInput.image}
                    description={editPostInput.description}
                    date={editPostInput.date}
                    />
                    <i className='fa fa-x' id="edit_post_exit"onClick={handleExitEditPost}></i>
                </div>
            </div>:<></>}
        <div className='my_post_title'>My Posts
        {/* <button onClick={handleExploreOnClick}>Explore</button> */}
        </div>
        <div className='posts'>
        {posts.map((post)=>{
            return(<div className='post' key={post._id}>
            <div className='post_options'>
                <i className='fa fa-ellipsis'></i>
                <div className='posts_dropdown'>
                        <a id={post._id} onClick={handleEditPost}>Edit</a>
                        <a id={post._id} onClick={handleDeletePost}>Delete</a>
                </div>
            </div>
            <div className='post_image_wrapper'><img className='post_image' src={post.image}></img></div>
            <div className='post_date'>{changeDateToLetter(post.date)}</div>
                <div className='post_description'>
                    {post.description}
                </div>
        </div>)
        })}
        {updated?<CircularProgress/>:posts.length===0?<h1>No Posts</h1>:<></>}
        </div>
    </div>)
}

export default MyPost