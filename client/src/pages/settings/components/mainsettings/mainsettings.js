import React,{useState,useEffect} from 'react'
import './mainsettings.css'
import {useNavigate} from 'react-router-dom'
import api from '../../../../api/api'
import {nameSettingsChecker,usernameSettingsChecker,emailSettingsChecker,passwordSettingsChecker} from '../../../login/inputchecker'

function MainSettings(props){
    const resetState = {
        oldName:"",
        name:"",
        oldEmail:"",
        newEmail:"",
        cEmail:"",
        oldPW:"",
        newPW:"",
        cPW:"",
        oldUsername:"",
        newUsername:"",
        cUsername:"",
        privacy:"",
        deletePW:""
    }
    const [settingsInput,setSettingsInput] = useState(resetState)
    const [updated,setUpdated] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        async function validate(){
            const response = await api.post('/authenticate',{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status){
                setSettingsInput({...resetState,
                    oldName:response.data.user.name,
                    privacy:response.data.user.privacy
                })
                return
            }
        }
        validate()
        setUpdated(false)
        console.log("updated")
    },[updated])
    function handleTogglePW(e){
        document.getElementById(e.target.id).type==="password"?document.getElementById(e.target.id).type="text":document.getElementById(e.target.id).type="password"
    }
    function handleBackButton(){
        navigate(-1)
    }
    function handleSettingsOnChange(e){
        switch(e.target.name){
            case "name":setSettingsInput({...settingsInput,name:e.target.value})
            break
            case "oldEmail":setSettingsInput({...settingsInput,oldEmail:e.target.value})
            break
            case "newEmail":setSettingsInput({...settingsInput,newEmail:e.target.value})
            break
            case "cEmail":setSettingsInput({...settingsInput,cEmail:e.target.value})
            break
            case "oldPW":setSettingsInput({...settingsInput,oldPW:e.target.value})
            break
            case "newPW":setSettingsInput({...settingsInput,newPW:e.target.value})
            break
            case "cPW":setSettingsInput({...settingsInput,cPW:e.target.value})
            break
            case "oldUsername":setSettingsInput({...settingsInput,oldUsername:e.target.value})
            break
            case "newUsername":setSettingsInput({...settingsInput,newUsername:e.target.value})
            break
            case "cUsername":setSettingsInput({...settingsInput,cUsername:e.target.value})
            break
            case "privacy":setSettingsInput({...settingsInput,privacy:e.target.value})
            break
            case "deletePW":setSettingsInput({...settingsInput,deletePW:e.target.value})
        }
        document.getElementById('change_name').innerHTML = ""
        document.getElementById('change_email').innerHTML = ""
        document.getElementById('change_password').innerHTML = ""
        document.getElementById('change_username').innerHTML = ""
        document.getElementById('change_privacy').innerHTML = ""
        document.getElementById('delete_acc').innerHTML = ""
    }
    function handleSubmit(e){
        const {name,oldEmail,newEmail,cEmail,oldPW,newPW,cPW,oldUsername,newUsername,cUsername,privacy,deletePW} = settingsInput
        async function updateAccount(changeType,toUpdate){
            const response = await api.patch('/account',toUpdate,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                }
            })
            if(response.data.status===null)
            {document.getElementById('change_'+changeType).innerHTML = `This ${changeType} does not exist`}
            else if(response.data.status)
            {document.getElementById('change_'+changeType).innerHTML = `Updated ${changeType}`;setUpdated(true)}
            else document.getElementById('change_'+changeType).innerHTML = `Something went wrong. Please try again later.`
        }
        switch(e.target.name){
            case "name":
                if(nameSettingsChecker(name,props.name)==='ok'){
                            updateAccount("name",{type:"name",name})
                            return
                }
                document.getElementById('change_name').innerHTML = nameSettingsChecker(name,props.name); break;
            case "email":
                if(emailSettingsChecker(props.email,oldEmail,newEmail,cEmail)==='ok'){
                            updateAccount("email",{type:"email",email:newEmail,oldEmail})
                            return
                }
                document.getElementById('change_email').innerHTML = emailSettingsChecker(props.email,oldEmail,newEmail,cEmail); break;
            case "password":
                if(passwordSettingsChecker(oldPW,newPW,cPW)==='ok'){
                            updateAccount("password",{type:"password",password:newPW,oldPW})
                            return
                }
                document.getElementById('change_password').innerHTML = passwordSettingsChecker(oldPW,newPW,cPW); break;
            case "username":
                if(usernameSettingsChecker(props.username,oldUsername,newUsername,cUsername)==='ok'){
                            updateAccount("username",{type:"username",password:newUsername,oldUsername})
                            return
                }
                document.getElementById('change_username').innerHTML = usernameSettingsChecker(props.username,oldUsername,newUsername,cUsername); break;
            case "privacy":
                updateAccount("privacy",{type:"privacy",privacy:!privacy}); break;
            case "delete":
                async function deletePost(){
                    const response = await api.delete(`/account`,{
                        data:{password:deletePW},
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem('token')} ${localStorage.getItem('username')}`
                        }
                    })
                    if(response.data.status)
                    {document.getElementById('delete_acc').innerHTML = `Account Deleted`
                    localStorage.clear()}
                }
                if(deletePW!=="")
                deletePost()
                document.getElementById('delete_acc').innerHTML = `Please enter your password to delete your account`
        }

    }
    return(<div className='main_settings'>
            <div className='main_settings_wrapper'>
                <div className='main_settings_back'><i className='fa fa-arrow-left' onClick={handleBackButton}></i></div>
                <div className='change_name'>
                    <div className='settings_title'>
                    Change Name
                    </div>
                    <div className='settings_divider'></div>
                    <h4>Current Name: {settingsInput.oldName}</h4>
                    <input placeholder='Name' name="name" value={settingsInput.name} onChange={handleSettingsOnChange}></input>
                    <p id="change_name"></p>
                    <br></br>
                    <button name="name" onClick={handleSubmit}>Change Name</button>
                </div>
                <div className='change_email'>
                    <div className='settings_title'>
                    Change Email
                    </div>
                    <div className='settings_divider'></div>
                    <input placeholder='Old Email' name="oldEmail" value={settingsInput.oldEmail} onChange={handleSettingsOnChange}></input>
                    <input placeholder='New Email' name="newEmail" value={settingsInput.newEmail} onChange={handleSettingsOnChange}></input>
                    <input placeholder='Confirm Email' name="cEmail" value={settingsInput.cEmail} onChange={handleSettingsOnChange}></input>
                    <p id="change_email"></p>
                    <br></br>
                    <button name="email" onClick={handleSubmit}>Change Email</button>
                </div>
                <div className='change_password'>
                <div className='settings_title'>
                    Change Password
                    </div>
                    <div className='settings_divider'></div>
                    <div className='password'><input type="password" placeholder='Old Password' name="oldPW" id="oldPW" value={settingsInput.oldPW} onChange={handleSettingsOnChange}/><i className='fa fa-eye' id="oldPW" onClick={handleTogglePW}/></div>
                    <div className='password'><input type="password" placeholder='New Password' name="newPW" id="newPW" value={settingsInput.newPW} onChange={handleSettingsOnChange}/><i className='fa fa-eye' id="newPW" onClick={handleTogglePW}/></div>
                    <div className='password'><input type="password" placeholder='Confirm Password' name="cPW" id="cPW" value={settingsInput.cPW} onChange={handleSettingsOnChange}/><i className='fa fa-eye' id="cPW" onClick={handleTogglePW}/></div>
                    <p id="change_password"></p>
                    <br></br>
                    <button name="password" onClick={handleSubmit}>Change Password</button>
                </div>
                <div className='change_username'>
                <div className='settings_title'>
                    Change Username
                    </div>
                    <div className='settings_divider'></div>
                    <input placeholder='Old Username' name="oldUsername" value={settingsInput.oldUsername} onChange={handleSettingsOnChange}></input>
                    <input placeholder='New Username' name="newUsername" value={settingsInput.newUsername} onChange={handleSettingsOnChange}></input>
                    <input placeholder='Confirm Username' name="cUsername" value={settingsInput.cUsername} onChange={handleSettingsOnChange}></input>
                    <p id="change_username"></p>
                    <br></br>
                    <button name="username" onClick={handleSubmit}>Change Username</button>
                </div>
                <div className='change_privacy'>
                <div className='settings_title'>
                    Change Privacy
                    </div>
                <div className='settings_divider'></div>
                <h4>Privacy Settings: {settingsInput.privacy?"Private":"Public"}</h4>
                <p id="change_privacy"></p>
                <br></br>
                <button name="privacy" onClick={handleSubmit}>Change</button>
                </div>
                <div className='delete_account'>
                <div className='settings_title'>
                    Delete Account
                    </div>
                <div className='settings_divider'></div>
                <div className='password'><input type="password" id="deletePW" placeholder='Password' name="deletePW" value={settingsInput.deletePW} onChange={handleSettingsOnChange}/><i className='fa fa-eye' id="deletePW" onClick={handleTogglePW}/></div>
                <p id="delete_acc"></p>
                <br></br>
                <button name="delete" onClick={handleSubmit}>Delete</button>
                </div>
            </div>
    </div>)
}

export default MainSettings