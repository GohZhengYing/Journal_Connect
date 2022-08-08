const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:[true,"please provide id"]
    },
    image:{
        type:String,
        required:[true,"please provide id"]
    },
    date:{
        type:String,
        required:[true,"please provide id"]
    },
    description:{
        type:String,
        required:[true,"please provide id"]
    },
})

module.exports = mongoose.model("Post",postSchema)