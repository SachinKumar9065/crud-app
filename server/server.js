import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());


//user router
app.use('/api', userRouter);

app.get('/',(req, res)=>{
    res.send("you are requested for home route")
})
app.get('/ping',(req, res)=>{
    res.send("pong")
})


mongoose.connect(process.env.MONGOURL,
    {
        dbName:"crud_operation"
    }
).then(()=>console.log("MongoDb Connected..!")).catch((err)=>console.log(err))

const port = process.env.PORT;
app.listen(port, ()=>console.log(`server is running on port ${port}`))