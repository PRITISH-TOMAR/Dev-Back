import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"../.env"
})

const Connect = () => {
    mongoose.connect( process.env.MONGO_URL).then(()=>{
        console.log("mongodb connected successfully");
    }).catch((e)=>{
        console.log(e);
    })
};
export default Connect;