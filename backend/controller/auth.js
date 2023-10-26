const bcrypt  =require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../model/userSchema')

const register = async(req,res)=>{
    try {
        const {username, password} = req.body
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const userNameExist = await userSchema.findOne({username:username})
        if(Boolean(userNameExist))return res.status(400).json({msg:'Username already taken'})
        
        const newUser = new userSchema({
            username,
            password:hashPassword,
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


const login = async(req,res)=>{
    try {
        const {username, password} = req.body
        const user = await userSchema.findOne({username:username})

        if(!Boolean(user))return res.status(400).json({msg:'user does not exist'});
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)return res.status(400).json({msg:'incorrect password'})
        const accessToken = jwt.sign({id:user._id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
        const refreshToken = jwt.sign({id:user._id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'1d'})

        const currentUser = await userSchema.findByIdAndUpdate({_id:user._id},{
            refreshToken:refreshToken
        },{
            new:true,
            runValidators:true,
        })
        delete user.password;
        res.cookie('jwt',refreshToken,{httpOnly:true, maxAge: 24*60*60*1000})
        res.status(200).json({accessToken, userId:currentUser._id,username:currentUser.username})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    register,
    login,
}