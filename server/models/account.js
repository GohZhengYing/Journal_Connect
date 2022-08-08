const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide name"]
    },
    username:{
        type:String,
        required:[true,"please provide name"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide name"]
    },
    email:{
        type:String,
        required:[true,"please provide name"],
        unique:true
    },
    posts_id:{
        type:Array,
        required:[true,"please provide name"]
    },
    friends_id:{
        type:Array,
        required:[true,"please provide name"]
    },
    sent_id:{
        type:Array,
        required:[true,"please provide name"]
    },
    pending_id:{
        type:Array,
        required:[true,"please provide name"]
    },
    privacy:{
        type:Boolean,
        required:[true,"please provide name"]
    }
})

module.exports = mongoose.model("Account",accountSchema)