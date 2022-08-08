require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const xss =  require('xss-clean')
const rateLimiter = require('express-rate-limit');

//import routers
const accountRouter = require('./routes/account')
const postRouter = require('./routes/post')
const loginRouter = require('./routes/login')
const authenticateRouter = require('./routes/auth')
const friendRouter = require('./routes/friend')

//import middleware
const authenticateMiddleware = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 5000

app.use(helmet())
app.use(xss())
app.use(cors())
app.use(
  rateLimiter({
    windowMs: 30 * 60 * 1000,
    max: 100,
  })
);
app.use(bodyParser.json({
    limit: '50mb'
  }));
  
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));


app.use('/account',accountRouter)
app.use('/post',authenticateMiddleware,postRouter)
app.use('/login',loginRouter)
app.use('/authenticate',authenticateMiddleware,authenticateRouter)
app.use('/friend',friendRouter)
app.get('/',(req,res)=>{res.send({msg:"server is working"})})

async function start(){
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected to database")
        app.listen(port,console.log(`Server is listening to port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()