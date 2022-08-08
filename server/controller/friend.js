require('dotenv').config()
const Account = require('../models/account')


async function addFriend(req,res){

    try {
        const newSent = req.user.sent_id
        newSent.push(req.body.friend_id)
        const addNewSent = await Account.findOneAndUpdate({_id:req.user._id},{sent_id:newSent})
        const friend = await Account.findOne({_id:req.body.friend_id})
        const newPending = friend.pending_id
        newPending.push(String(req.user._id))
        const addNewPending = await Account.findOneAndUpdate({_id:req.body.friend_id},{pending_id:newPending})
        res.status(200).json({status:true})
    } catch (error) {
        res.status(200).json({status:false})
    }
}

async function deleteFriend(req,res){

    try {

        const deleteFriend = await Account.findOneAndUpdate({_id:req.user._id},{"$pull":{friends_id:req.body.id}})
        const deleteSender = await Account.findOneAndUpdate({_id:req.body.id},{"$pull":{friends_id:String(req.user._id)}})
        res.status(200).json({status:true})
    } catch (error) {
        res.status(200).json({status:false})
    }
}

async function updateRequest(req,res){

    try {
        const user = await Account.findOne({_id:req.body.id})
        switch(req.body.type){
            case "sent": await Account.findOneAndUpdate({_id:req.user._id},{"$pull":{sent_id:req.body.id}})
                        await Account.findOneAndUpdate({_id:req.body.id},{"$pull":{pending_id:String(req.user._id)}})
                        break;
            case "pending": await Account.findOneAndUpdate({_id:req.user._id},{friends_id:req.user.friends_id.concat(req.body.id),"$pull":{pending_id:req.body.id}})
            await Account.findOneAndUpdate({_id:req.body.id},{friends_id:user.friends_id.concat(String(req.user._id)),"$pull":{sent_id:String(req.user._id)}})
            break;
            case "pendingReject": await Account.findOneAndUpdate({_id:req.user._id},{"$pull":{pending_id:req.body.id}})
                        await Account.findOneAndUpdate({_id:req.body.id},{"$pull":{sent_id:String(req.user._id)}})
                        break;
        }
        res.status(200).json({status:true})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}

async function getRequests(req,res){
    try {
        const {sent_id,pending_id} = req.user
        const friends = await Account.find({
            '_id':{
                $in:sent_id.concat(pending_id)}
            })
    res.status(200).json({friends,user:req.user})
    } catch (error) {
        res.status(200).json({status:false,error})
    }
}
async function searchFriend(req,res){
    const response = await Account.aggregate([
        {"$match":{
            "username":{"$regex":`${req.params.id}`,"$options":"i"}

    }}])
    res.status(200).json({friends:response.map(({_id,name,username})=>{return {_id,name,username}})})
}

module.exports = {
    searchFriend,
    addFriend,
    deleteFriend,
    updateRequest,
    getRequests
}