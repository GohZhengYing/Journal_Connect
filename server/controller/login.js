const Account = require('../models/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(req,res){
    const {username,password} = req.body
    user = await Account.findOne({username})
    async function comparePassword(password,enteredPassword){
        const isMatch = await bcrypt.compare(password,enteredPassword)
        return isMatch
    }
    if(user!== null){
        const isMatch = await comparePassword(password,user.password)
        if(isMatch){
        const id = new Date().getDate()
        const token = jwt.sign({id,password},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.status(200).json({status:"success",token})
    return}}
    res.status(200).json({status:"unsuccessful"})
}

module.exports = {
    login
}