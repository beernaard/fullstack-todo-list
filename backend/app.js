const express = require('express')
const cors = require('cors')
const connectDB = require('./config/connection')
const regLogRoute = require('./routes/auth')
const userTaskListRoute = require('./routes/userTaskList')
const notFound = require('./middleware/not-found')
const verifyToken = require('./middleware/verifyAuth')
const cookieParser = require('cookie-parser')
const refreshRoute = require('./routes/refresh')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const app = express()
require('dotenv').config()
//MIDLEWARE
app.use(helmet())
app.use(xss())
app.use(cookieParser())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.set('trust proxy', 1)

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

//ROUTES
app.use('/api/v1/auth',regLogRoute)
app.use('/api/v1/refresh', refreshRoute)
app.use('/api/v1/user',verifyToken, userTaskListRoute)
app.use(notFound)

  

const PORT = 8000


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{console.log(`server is listening to PORT ${PORT}...`)})  
    } catch (error) {
        console.log(error)
    }
}

start()

