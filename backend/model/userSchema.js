const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:[true, 'must provide a username'],
        trim:true,
        maxlength:[22, 'Username can not be more than 22 characters']
    },
    password:{
        type:String,
        require:true,
        min:8,
    },
    refreshToken:{
        type:String,
        require:true,
    },
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)