const Account = require('../models/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function auth(req,res){
    try {
        res.status(200).json({status:true,user:req.user})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
    
}

module.exports = {
    auth
}