const mongoose = require('mongoose')

function connectDB(url){
    try {
        return(
            mongoose.connect(url,{})
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB