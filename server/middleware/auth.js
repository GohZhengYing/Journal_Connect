const Account = require('../models/account')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function authMiddleware(req,res,next){
    try {
        const header = req.headers.authorization
        if(header!==null&&header.startsWith('Bearer ')){
            const token = header.split(' ')[1]
            const username = header.split(' ')[2]
            user = await Account.findOne({username})
            if(user!== null){
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            async function comparePassword(enteredPassword,password){
                const isMatch = await bcrypt.compare(enteredPassword,password)
                return isMatch
            }
            const correctPW = comparePassword(decoded.password,user.password)
            if(correctPW){
                req.user = user
                next()
                return
            }
            }
        }
        throw Error
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}

module.exports = authMiddleware
