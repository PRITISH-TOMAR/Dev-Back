import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import Routemain from './Routes/Routemain.js';
import RouteArticles from './Routes/RouteArticles.js';
import RouteComment from './Routes/RouteComment.js'
import Email from "./Routes/RouteEmail.js"


// ..................................................................
// Connect()
dotenv.config({ path: '.env' });
mongoose.connect( process.env.MONGO_URL).then
    (() => {
        console.log("Mongodb connected")
    }).catch((e) =>
        console.log(e)
)

//..................................................................

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const corsOptions = {
    origin:process.env.ORIGIN,
    credentials:true 
}


app.use(cors(corsOptions));

//...................................................................


app.use("/api", Routemain)
app.use("/articles", RouteArticles)
app.use("/comments", RouteComment)
app.use("/email", Email)


//....................................................................
app.listen(process.env.PORT, () => {
    console.log('Server Running at Port ' + process.env.PORT);
});
 