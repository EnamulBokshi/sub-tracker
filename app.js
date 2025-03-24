
import cookieParser from "cookie-parser";
import express from "express";
import {PORT,ARCJET_KEY} from './config/env.js';

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjet,{sheild, detectBot, tokenBucket} from "@arcjet/node";
import {isSpoofedBot} from "@arcjet/inspect"




const app = express();

const aj = arcjet({
    key:ARCJET_KEY,
    characteristics:["ip","user-agent"],
    rules: [
        sheild({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:MONITORING",
                "CATEGORY:VALIDATOR",
                "CATEGORY:ANALYTICS",
                "CATEGORY:SEO"
                
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate:5,
            interval:10,
            capacity:10,
        })
    ]
})


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.send("Welcome to the SubTrack API")

})

app.listen(PORT,async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectToDatabase()
})

export default app;