import React,{useState,useEffect} from 'react'
import './newpost.css'
import Resizer from 'react-image-file-resizer'
import api from '../../../../../api/api'

function NewPost(props){
    const [newPost,setNewPost] = useState({
        file:"",
        image:`${props.image?props.image:""}`,
        description:`${props.description?props.description:""}`,
        date:`${props.date?props.date:""}`
    })
    //date changer
    function changeDateToLetter(oldDate){
        if(oldDate!=="")
        {let [year,month,day] = oldDate.split('-')
        const months = [" Jan "," Feb "," Mar "," Apr "," May "," Jun "," Jul "," Aug "," Sep "," Oct "," Nov "," Dec "]
        months.map((m,index)=>{if(index===Number(month)-1)month=m})
        return day+month+year}
    }
    useEffect(()=>{

    },[])
    //onchange handler
    function handleNewPostOnChange(e){
        switch(e.target.name){
            case "description":setNewPost({...newPost,description:e.target.value})
            break
            case "date":setNewPost({...newPost,date:e.target.value})
        }
        !props.edit?document.getElementById('new_post').innerHTML = ""
        :document.getElementById('edit_post').innerHTML = ""
    }
    //image resizer
    function handleImageSubmit(e){
        e.preventDefault()
        setNewPost({...newPost,file:e.target.value})
        try {
            Resizer.imageFileResizer(
                e.target.files[0],
                450,
                500,
                "PNG",
                90,
                0,
                (uri) => {
                    console.log(uri.length)
                  setNewPost({...newPost,image:uri,file:e.target.value})
                },
                "base64"
              );
        } catch (error) {
            console.log(error)
        }
    }
    //submit handler
    function handleNewPostSubmit(e){
        if(!props.edit)
        {let {image,description,date} = newPost
        description = "\n"+description+"\n\n\n\n\n"
        if(description!==""&&date!==""){
            async function newPost(){
                const respond = await api.post('/post',{image,description,date},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                    }
                })
                if(!respond.data.status){
                    document.getElementById('new_post').innerHTML = "Failed to post"
                    return
                }
                document.getElementById('new_post').innerHTML = "Posted"
                props.setPosted(true)
                setNewPost({image:'',description:'',date:'',file:""})
                return
            }
            newPost()
        }
        else
        document.getElementById('new_post').innerHTML = "Please fill up all fields"}
        else{
            const {image,description,date} = newPost
        if(description!==""&&date!==""){
            async function updatePost(){
                const respond = await api.patch(`/post/${props.id}`,{image,description,date},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                    }
                })
                if(!respond.data.status){
                    document.getElementById('edit_post').innerHTML = "Failed to update"
                    return
                }
                document.getElementById('edit_post').innerHTML = "Updated"
                document.getElementById('edit_post_exit').click()
                return
            }
            updatePost()
        }
        else
        document.getElementById('edit_post').innerHTML = "Please fill up all fields"
        }
    }
    return(<div className='new_post'>
            <div className='new_post_title'>{props.edit?"Edit Post":"New Post"}</div>
            <div className='new_post_input'>
                    <input type="file" accept="image/png, image/jpeg" onChange={handleImageSubmit} value={newPost.file}></input>
                <input name="date" type="date" value={newPost.date} onChange={handleNewPostOnChange}></input>
                <textarea name="description" value={newPost.description} onChange={handleNewPostOnChange}></textarea>
            </div>
            <div className='new_post_display'>
                <div className='new_post_display_image_wrapper'><img className='new_post_display_image' src={newPost.image} alt=""></img></div>
                <div className='new_post_display_date'>{changeDateToLetter(newPost.date)}</div>
                <div className='new_post_display_description'>
                    <div>{newPost.description}</div>
                </div>
            </div>
            <br></br>
            <p id={props.edit?"edit_post":"new_post"}></p>
            {<button className='post_button' onClick={handleNewPostSubmit}>{props.edit?"Update":"Post"}</button>}
    </div>)
}

export default NewPost