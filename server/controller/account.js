require('dotenv').config()
const Account = require('../models/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

async function forgetAccount(req,res){
    const [email,param] = req.params.id.split(',')
    try {
        const findEmail = await Account.findOne({email})

        if(findEmail){
            let paramValue
            if(param==='password')
            {function makeid(length) {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for ( var i = 0; i < length; i++ ) {
                  result += characters.charAt(Math.floor(Math.random() * 
             charactersLength));
               }
               return result;
            }
            
            const tempPW = makeid(15)
                const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(tempPW,salt)
            let passwordResponse = await Account.findOneAndUpdate({_id:req.user._id},{password},
                {new:true})
            paramValue = tempPW}
            else
            paramValue = findEmail.username
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PW,
                  clientId: process.env.OAUTH_CLIENTID,
                  clientSecret: process.env.OAUTH_CLIENT_SECRET,
                  refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
              });
            const mailOptions = {
                from: 'journalconnectofficial@gmail.com',
                to:email,
                subject:'Journal Connect login information',
                text:`Hi ${findEmail.name}! \n
                    This is your ${param}: ${paramValue}`
            }
            transporter.sendMail(mailOptions,function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            })
            res.status(200).json({status:true})
        }
        else res.status(200).json({status:false})
    } catch (error) {
        console.log(error)
    }
}
async function getFriends(req,res){
    try {
        const {friends_id} = req.user
        const friends = await Account.find({
            '_id':{
                $in:friends_id}
            })
    res.status(200).json({status:true,friends,user:req.user})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}
async function createAccount(req,res){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    console.log("here")
    try {
        const response = await Account.create({...req.body,password:hashedPassword,post_id:[],sent_id:[],pending_id:[],friends_id:[]})
        const id = new Date().getDate()
        const token = jwt.sign({id,password:req.body.password},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({status:true,token})
    } catch (error) {
        console.log(error)
        res.status(200).json({status:false,taken:error.keyPattern})
    }



}
async function updateAccount(req,res){
    try {
        switch(req.body.type){
            case "email":
                const email = req.body.email
                if(req.user.email===req.body.oldEmail)
                {let emailResponse = await Account.findOneAndUpdate({_id:req.user._id},{email},
                 {new:true})
                 if(emailResponse!==null)
                return res.status(200).json({status:true})
                else
                return res.status(200).json({status:false})
                }
                else return res.status(200).json({status:null})
            case "password":
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(req.body.password,salt)
                let passwordResponse = await Account.findOneAndUpdate({_id:req.user._id},{password},
                    {new:true})
                if(passwordResponse!==null)
                return res.status(200).json({status:true})
                else
                return res.status(200).json({status:false})
            case "username":
                const username = req.body.username
                if(req.user.username===req.body.oldUsername)
                {let usernameResponse = await Account.findOneAndUpdate({_id:req.user._id},{username},
                    {new:true})
                    if(usernameResponse!==null)
                return res.status(200).json({status:true})
                else
                return res.status(200).json({status:false})
                }
                else return res.status(200).json({status:null})
            case "privacy":
                    const privacy = req.body.privacy
                    let privacyResponse = await Account.findOneAndUpdate({_id:req.user._id},{privacy},
                    {new:true})
                    if(privacyResponse!==null)
                return res.status(200).json({status:true})
                else
                return res.status(200).json({status:false})
            case "name":
                const name = req.body.name
                let nameResponse = await Account.findOneAndUpdate({_id:req.user._id},{name},
                {new:true})
                if(nameResponse!==null)
            return res.status(200).json({status:true})
            else
            return res.status(200).json({status:false})



        }
    } catch (error) {
        res.status(200).json({status:false,error})
    }
    
}
async function deleteAccount(req,res){
    console.log(req.body.password)
    try {
        async function comparePassword(enteredPassword,password){
            const isMatch = await bcrypt.compare(enteredPassword,password)
            return isMatch
        }
        const correctPW = comparePassword(req.user.password,req.body.password)
        if(correctPW){
            for(let i=0;i<req.user.friends_id;i++){
                const deleteFriends = await Account.findOneAndUpdate({_id:req.user.friends_is[i]},{"$pull":{friends_id:String(req.user._id)}})
            }
            for(let i=0;i<req.user.pending_id;i++){
                const deletePending = await Account.findOneAndUpdate({_id:req.user.pending_id[i]},{"$pull":{sent_id:String(req.user._id)}})
            }
            for(let i=0;i<req.user.sent_id;i++){
                const deleteSent = await Account.findOneAndUpdate({_id:req.user.sent_id[i]},{"$pull":{pending_id:String(req.user._id)}})
            }
            for(let i=0;i<req.user.posts_id;i++){
                const deletePosts = await Post.findOneAndDelete({_id:req.posts_id[i]})
            }
            const response = await Account.findOneAndDelete({_id:req.user._id})
            res.status(200).json({status:true})
        }
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}


module.exports = {
    forgetAccount,
    getFriends,
    createAccount,
    updateAccount,
    deleteAccount,

}