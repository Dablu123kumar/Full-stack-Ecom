import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectedToDB from './DataBase/DataBase.js'
import router from './Routes/Route.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))

app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())

app.use('/api',router)
ConnectedToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`db is connected`)
        console.log(`Server is running on port : ${PORT}`)
    })
})
.catch(() => {
    console.log('db is not connected')
})



