const jwt = require('jsonwebtoken')
const userSchema = require('../model/userSchema')

const refreshTokenController = (req,res)=>{

        const cookies = req.cookies
        if(!cookies?.jwt)return res.sendStatus(403);
        const refreshToken = cookies.jwt   
        const User = userSchema.find({refreshToken:refreshToken})
        if(!Boolean(User))return res.sendStatus(403);
        const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if(!verified)return res.sendStatus(403)
        req.user =verified
        const accessToken = jwt.sign({id:User._id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
        res.json({accessToken})
}

module.exports = {
    refreshTokenController
}
