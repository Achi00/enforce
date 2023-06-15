import express from "express";
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import orderRouter from './routes/order.routes.js'
import bodyParser from "body-parser";

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({message: 'Hi'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/powder', postRouter)
app.use('/api/v1/amino', postRouter)
app.use('/api/v1/vitamin', postRouter)
app.use('/api/v1/gainer', postRouter)
app.use('/api/v1/order', orderRouter)

const startServer = async () => {
    try {
        // connect to db
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('server started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer()