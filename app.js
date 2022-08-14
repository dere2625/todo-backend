const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const swaggerDocument = require('./swagger.json')
const config = require('./util/config')
const response = require('./util/response')
const todoRouter = require('./routes/todoRouter')
const userRouter = require('./routes/userRouter')
const { default: mongoose } = require('mongoose')



async function connectDb(){
    await mongoose.connect(config.configuration.mongoConnectionString)
}

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
    origin : '*'
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/user', userRouter)
app.use('/todo', todoRouter)


app.use('/', (req, res) => {
    
    res.send(response.notFound())
})

app.listen(config.configuration.port, ()=>{
    connectDb()
    .then(() => {
        console.log('Mongo connected')
        console.log(`app running on ${config.configuration.port}`)
    })
    .catch((err) => {
        console.log('error connecting to mongodb',err)
    })
    
})