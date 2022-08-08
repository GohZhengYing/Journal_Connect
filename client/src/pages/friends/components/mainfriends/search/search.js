import React,{useEffect,useState} from 'react'
import './search.css'
import api from '../../../../../api/api'
import CircularProgress from '@mui/material/CircularProgress'

function Search(){
    const [searchList,setSearchList] = useState([])
    const [filterList,setFilterList] = useState([])
    const [searchInput,setSearchInput] = useState("")
    const [added, setAdded] = useState(true)
    useEffect(()=>{
        async function fetchData(){
            const response = await api.post('/authenticate',{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            const {friends_id,sent_id,pending_id,_id} = response.data.user
            setFilterList(friends_id.concat(sent_id,pending_id,_id))
            setAdded(false)
        }
        fetchData()
        
    },[added])
    function handleSearchOnChange(e){
        setSearchInput(e.target.value)
    }
    function handleSearchEnter(e){
        document.getElementById("search_alert").innerHTML = ""
        if(e.key==="Enter")
            document.getElementById("search").click()
    }
    function handleSearchFriends(){
        async function findFriends(){
            const response = await api.get('/friend/'+searchInput,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            setSearchList(response.data.friends)
            setAdded(false)
        }
        setAdded(true)
        findFriends()
        
    }
    function handleAddFriends(e){
        async function addFriends(){
            const response = await api.post('/friend/',{friend_id:e.target.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status)
            {setFilterList(filterList.concat(e.target.id))
            setAdded(true)
            document.getElementById("search_alert").innerHTML = "Request sent"}
            else document.getElementById("search_alert").innerHTML = "Something went wrong. Try again later"
        }
        addFriends()

    }
    return(<div className='search'>
        <p id="search_alert"></p>
        <div className='search_bar'><input id="search_input" placeholder='Search' value={searchInput} onChange={handleSearchOnChange} onKeyDown={handleSearchEnter}/><i className='fa fa-search' id="search" onClick={handleSearchFriends}/></div>
        {searchList.map((friend)=>{
            if(!filterList.includes(friend._id))
            return(
                <div className='search_friend' key={friend._id}>{friend.name}<p>Username: {friend.username}</p><i className='fa fa-plus' id={friend._id} onClick={handleAddFriends}></i></div>
            )
        })}
        {added?<CircularProgress/>:<></>}
    </div>)
}

export default Search