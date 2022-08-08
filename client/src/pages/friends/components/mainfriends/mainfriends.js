import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './mainfriends.css'
import MyFriends from './myfriends/myfriends'
import Request from './request/request'
import Search from './search/search'

function MainFriends(props){
    const [page,setPage] = useState("myfriends")
    const [tabColor,setTabColor] = useState([
        {background:"rgb(238, 154, 57)",color:"white"},
        {background:"transparent",color:"black"},
        {background:"transparent",color:"black"}
    ])
    const navigate = useNavigate()
    function currentPage(){

        switch(page){
            case "myfriends":return(<MyFriends friendsList={props.friends_id}/>)
            case "search":return(<Search/>)
            case "request":return(<Request/>)
        }
    }
    function handleNavigateOnClick(e){
        setPage(e.target.value)
        const nlist = ["myfriends","search","request"]
        nlist.map((clicked,index)=>{
            if(clicked===e.target.value){
                let newTabColor = tabColor
                newTabColor[index] = {background:"rgb(238, 154, 57)",color:"white"}
                setTabColor(newTabColor)
                return
            }
            let newTabColor = tabColor
            newTabColor[index] = {background:"transparent",color:"black"}
            setTabColor(newTabColor)
        })
    }
    function handleBackOnClick(){
        navigate(-1)
    }
    return(<div className='main_friends'>
            <div className='main_friends_wrapper'>
            <div className='main_friends_back'><i className='fa fa-arrow-left' onClick={handleBackOnClick}></i></div>
                <div className='main_friends_navigate'>
                    <button value="myfriends" onClick={handleNavigateOnClick} style={tabColor[0]}>My Friends</button>
                    <button value="search" onClick={handleNavigateOnClick} style={tabColor[1]}>Search</button>
                    <button value="request" onClick={handleNavigateOnClick} style={tabColor[2]}>Request</button>
                </div>
                {currentPage()}
            </div>
    </div>)
}

export default MainFriends