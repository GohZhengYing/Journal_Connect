import React,{useState} from 'react'
import './mainexplore.css'
import ExplorePosts from './exploreposts/exploreposts'
import Feed from './feed/feed'
import { useNavigate } from 'react-router-dom'

function MainExplore(props){
    const [page,setPage] = useState("feed")
    const [tabColor,setTabColor] = useState([
        {background:"rgb(238, 154, 57)",color:"white"},
        {background:"transparent",color:"black"},
    ])
    const navigate = useNavigate()
    function currentPage(){

        switch(page){
            case "feed":return(<Feed change={changeDateToLetter}/>)
            case "explore":return(<ExplorePosts/>)
        }
    }
    function changeDateToLetter(oldDate){
        if(oldDate!=="")
        {let [year,month,day] = oldDate.split('-')
        const months = [" Jan "," Feb "," Mar "," Apr "," May "," Jun "," Jul "," Aug "," Sep "," Oct "," Nov "," Dec "]
        months.map((m,index)=>{if(index===Number(month)-1)month=m})
        return day+month+year}
    }
    function handleExploreNavigateOnClick(e){
        setPage(e.target.value)
        const nlist = ["feed","explore"]
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
    function backToTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    }
    function handleBackOnClick(){
        navigate(-1)
    }
    return(<div className='main_explore'>
        <i className='fa fa-circle-up' onClick={backToTop}></i>
        <div className='main_explore_wrapper'>
        <div className='main_explore_back'><i className='fa fa-arrow-left' onClick={handleBackOnClick}></i></div>
            <div className='main_explore_navigate'>
                        <button value="feed" onClick={handleExploreNavigateOnClick} style={tabColor[0]}>Feed</button>
                        <button value="explore" onClick={handleExploreNavigateOnClick} style={tabColor[1]}>Explore</button>
            </div>
            {currentPage()}
        </div>
    </div>)
}

export default MainExplore