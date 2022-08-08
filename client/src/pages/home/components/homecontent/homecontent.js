import React,{useState} from 'react'
import './homecontent.css'
import NewPost from './newpost/newpost'
import MyPost from './myposts/mypost'
import FriendsList from './friendslist/friendslist'

function HomeContent(props){
    const [posted,setPosted] = useState(false)
    return(<div className='home_content'>
        <div className='home_content_wrapper'>
            <NewPost posted={posted} setPosted={setPosted}/>
            <MyPost posted={posted} setPosted={setPosted}/>
            <FriendsList {...props}/>
        </div>

    </div>)
}

export default HomeContent