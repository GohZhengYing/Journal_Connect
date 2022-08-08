import React,{useState,useEffect} from 'react'
import './mainlogin.css'
import api from '../../../../api/api'
import {useNavigate} from 'react-router-dom'
import { nameChecker,usernameChecker,passwordChecker,emailChecker} from '../../inputchecker'

function MainLogin(){
    const [loginInput,setLoginInput] = useState({
        username:"",
        password:""
    })
    const [signupInput,setSignupInput] = useState({
        email:"",
        confirmEmail:"",
        password:"",
        confirmPassword:"",
        name:"",
        username:"",
        privacy:false
    })
    const [newUser,setNewUser] = useState(false)
    const [forgottenInput,setForgottenInput] = useState({
        email:"",
        forgot:false
    })
    const navigate = useNavigate()
    //declaring useEffect
    useEffect(()=>{

    },[])
    //onchange handlers
    function handleLoginInputChange(e){
        switch(e.target.name){
            case "username":setLoginInput({...loginInput,username:e.target.value})
            break
            case "password":setLoginInput({...loginInput,password:e.target.value})
        }
    }
    function handleSignupInputChange(e){
        switch(e.target.name){
            case "email":setSignupInput({...signupInput,email:e.target.value})
            break
            case "confirmEmail":setSignupInput({...signupInput,confirmEmail:e.target.value})
            break
            case "password":setSignupInput({...signupInput,password:e.target.value})
            break
            case "confirmPassword":setSignupInput({...signupInput,confirmPassword:e.target.value})
            break
            case "name":setSignupInput({...signupInput,name:e.target.value})
            break
            case "username":setSignupInput({...signupInput,username:e.target.value})
            break
        }

    }
    function handleForgottenPW(e){
        document.getElementById("forgotten_pw_alert").innerHTML =""
        switch(e.target.name){
            case "email":setForgottenInput({...forgottenInput,email:e.target.value})
        }
        
    }
    //submit handler
    function handleLoginSubmit(e){
        e.preventDefault()
        document.getElementById('login').innerHTML = ""
        async function tryLogin(){
            const respond = await api.post('login',loginInput)
            if(respond.data.status !== "success"){
                document.getElementById('login').innerHTML = "Login Failed!"
                return
            }
            localStorage.setItem('token',respond.data.token)
            localStorage.setItem("username",loginInput.username)
            navigate('/home')
        }
        tryLogin()
    }
    function handleSignupSubmit(e){
        e.preventDefault()
        let filled = true
        const cred = ['signup_email','signup_password','signup_name','signup_username','signup_privacy']
        cred.map((doc)=>{document.getElementById(doc).innerHTML = ""})
        if(emailChecker(signupInput.email,signupInput.confirmEmail)!=='ok'){
            filled = false
            document.getElementById('signup_email').innerHTML = emailChecker(signupInput.email,signupInput.confirmEmail)
        }
        if(passwordChecker(signupInput.password,signupInput.confirmPassword)!=='ok'){
            filled = false
            document.getElementById('signup_password').innerHTML = passwordChecker(signupInput.password,signupInput.confirmPassword)
        }
        if(nameChecker(signupInput.name) !== "ok"){
            console.log(nameChecker(signupInput.name))
            filled = false
            document.getElementById('signup_name').innerHTML = nameChecker(signupInput.name)
        }
        if(usernameChecker(signupInput.username) !== "ok"){
            filled = false
            document.getElementById('signup_username').innerHTML = usernameChecker(signupInput.username)
        }
        if(e.nativeEvent.path[2][6].checked === e.nativeEvent.path[2][7].checked){
            filled = false
            document.getElementById('signup_privacy').innerHTML = "Please select your preference"
        }
        else setSignupInput({...signupInput,privacy:e.nativeEvent.path[2][6].checked})
        
        
        async function sendData(){
            const response = await api.post('/account',{
                email:signupInput.email,
                password:signupInput.password,
                name:signupInput.name,
                username:signupInput.username,
                privacy:signupInput.privacy,})
                if(response.data.status){
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem("username",signupInput.username)
                    console.log(localStorage.getItem("token"),localStorage.getItem("username"))
                    navigate('/home')
                    return
                }
                else{
                    if(response.data.taken.email)
                    document.getElementById('signup_email').innerHTML = "Email is already in use"
                    if(response.data.taken.username)
                    document.getElementById('signup_username').innerHTML = "Username is taken"
                }
                

        }
        if(filled){
            sendData()
        }
    }
    function handleForgottenPWSubmit(){
        if(forgottenInput.email==="")
        {document.getElementById("forgotten_pw_alert").innerHTML ="Please provide your email"
        return}
        async function sendEmail(){
            const response = await api.get('/account/'+forgottenInput.email+','+`${document.getElementById('forgottenUsername').checked?"username":"password"}`)
            if(response.data.status)
            document.getElementById("forgotten_pw_alert").innerHTML =`Your ${document.getElementById('forgottenUsername').checked?"username":"password"} has been sent to your email`
            else
            document.getElementById("forgotten_pw_alert").innerHTML ="This email does not exist"
        }
        sendEmail()
    }
    return(
        <div className='mainlogin'>
            {newUser? 
            <div className='signup_window'>
                <i className='fa fa-close' onClick={()=>{setNewUser(false)}}></i>
                <div className='signup_title'><h1>SignUp</h1></div>
                <form>
                    <div className='signup_input'>
                        
                        <div className='signup_divider'>Email</div>
                        <input name="email" placeholder='Email' value={signupInput.email} onChange={handleSignupInputChange}></input>
                        <br></br>
                        <input name="confirmEmail" placeholder='Confirm Email' value={signupInput.confirmEmail} onChange={handleSignupInputChange}></input>
                        <p id="signup_email" className='alert_msg'></p>
                        <div className='signup_divider'>Password</div>
                        <input name="password" placeholder='Password' type="password" value={signupInput.password} onChange={handleSignupInputChange}></input>
                        <br></br>
                        <input name="confirmPassword" placeholder='Confirm Password' type="password" value={signupInput.confirmPassword} onChange={handleSignupInputChange}></input>                       
                        <p id="signup_password" className='alert_msg'></p>
                        <div className='signup_divider'>Name</div>
                        <input name="name" placeholder='Name' value={signupInput.name} onChange={handleSignupInputChange}></input>                       
                        <p id="signup_name" className='alert_msg'></p>
                        <div className='signup_divider'>Username</div>
                        <input name="username" placeholder='Username' value={signupInput.username} onChange={handleSignupInputChange}></input>
                        <p id="signup_username" className='alert_msg'></p>
                        <div className='signup_divider'>Privacy</div>
                        Do you want your posts to be public or only seen by friends?
                        <div className='privacy'>
                        <div><input name="privacy" type="radio" value="public" id="public"></input>Public</div>
                        <div><input name="privacy" type="radio" value="private" id="private"></input>Private</div>
                        <p id="signup_privacy" className='alert_msg'></p>
                        </div>
                        <button onClick={handleSignupSubmit}>SignUp</button>
                    </div>
                </form>
            </div>
            :<div className='login_wrapper'>
                {forgottenInput.forgot?<div className='forgotten_pw_window'>
                <i className='fa fa-close' onClick={()=>setForgottenInput({...forgottenInput,forgot:false})}></i>
                <div className='forgotten_pw_title'><h1>Forgotten Password Or Username</h1></div>
                <div className='forgotten_pw_inpt'><input name="forgottenInpt" type="radio" id="forgottenUsername" defaultChecked onClick={handleForgottenPW}></input>Username</div>
                <div className='forgotten_pw_inpt'><input name="forgottenInpt" type="radio" id="forgottenPassword" onClick={handleForgottenPW}></input>Reset Password</div>

                <br></br>
                <input name="email" placeholder='Email' type="text" value={forgottenInput.email} onChange={handleForgottenPW}></input>
                <p id="forgotten_pw_alert"></p>
                <button onClick={handleForgottenPWSubmit}>Submit</button>
                </div>
                :<></>}
            <div className='login_window'>
                <div className='login_title'><h1>Login</h1></div>
                <form>
                <p id="login" className='alert_msg'></p>
                <div className='login_input'>
                
                        <input name="username" placeholder='Username' value={loginInput.username} onChange={handleLoginInputChange}></input>
                        <br></br>
                        <input name="password" placeholder='Password' type="password" value={loginInput.password} onChange={handleLoginInputChange}></input>
                        <br></br>

                        <button onClick={handleLoginSubmit}>Login</button>
                        <span>or</span>
                </div>
                </form>
                <button onClick={()=>{setNewUser(true)}}>SignUp</button>
                {/* <a className='forgotten_pw_link'  onClick={()=>setForgottenInput({...forgottenInput,forgot:true})}>Forgottten your password or username</a> */}
            </div>
            </div>}
        </div>
    )
}
export default MainLogin