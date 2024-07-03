
import mongoose from 'mongoose'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



const Schema = new mongoose.Schema
({
    fullName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
}, { timestamps : true})

 const Data = mongoose.model("person", Schema) 

 export const Login = async(req,res)=>{
    try {
        
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message:"Invalid data",
                success:false
                 
            })
        };
        const user = await Data.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password", 
                success:false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false
            });
        }
       const tokenData = {
        id:Data._id
       }
        const token =  jwt.sign(tokenData, "tokenismyfirstbiltarray",{expiresIn:"1h"});

        return res.status(200).cookie("token", token).json({
            message:`Welcome back ${user.fullName}`,
            user,
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

export const Logout = async (req,res) => {
    return res.status(200).cookie("token", "", {expiresIn:new Date(Date.now()), httpOnly:true}).json({
        message:"User logged out successfully.",
        success:true,
    });
}


 export const Newuser = async( req, res)=>{
    try{
        const { fullName, email, password}= req.body

        if( !fullName || !email || !password) return res.status(400).json({
            message:"Invalid data ", success: false
        })

        const user = await Data.findOne({email})

        if(user) return res.status(401).json({
            message: "Email exist",
            success: false
        })

        const hashedPassword = await bcryptjs.hash(password,10);
        const person = new Data({ fullName, email, password:hashedPassword });
        await person.save();

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }

    catch(e)
    {
                console.log(e)
    }
}


export const Google = async( req, res)=>{
    try{
        const { fullName, email, password}= req.body

        const euser = await Data.findOne({ email: email})

        if(euser) return res.status(201).json({
            message:`Welcome back ${euser.fullName}`,
            user: euser,
            success: true
        })
      
        else
        {

            const hashedPassword = await bcryptjs.hash(password,10);
            const person = new Data({ fullName, email, password:hashedPassword });
            await person.save();
            
            return res.status(201).json({
                message:`Welcome  ${fullName}`,
                user : person,
                success: true,
            })
        }
    }

    catch(e)
    {
                console.log(e)
    }
}



export const Delete = async( req, res)=>{
   
    const email = req.body
    // console.log(email)
    try {
        const item = await Data.findOneAndDelete( email);

        
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'User Deleted Successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}




