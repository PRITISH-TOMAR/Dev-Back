
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
        require : true,
        unique:true
    },
    uniqueName : {
        type : String,
        require : true,
        unique:true
    },
    password : {
        type : String,
        require : true
    },
    profilePicture : {
        type : String,
        require:true,
        default:"https://imgs.search.brave.com/GVcDP9cX1YLhjAXS0-gIVZzpPpmCYLlsOHfwIOt7VfU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dHdvLXRvbmUtaW5r/LWNsb3VkLmpwZz93/aWR0aD0xMDAwJmZv/cm1hdD1wanBnJmV4/aWY9MCZpcHRjPTA"
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

        const isMatch =  bcryptjs.compare(password, user.password);
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
            message: "Email already exists!",
            success: false
        })



        const atIndex = email.indexOf('@');
    
        const uniqueName =  (atIndex !== -1 ? email.substring(0, atIndex) : email) + Math.floor(Math.random() * 1000);

       
       
   
        
        const hashedPassword = await bcryptjs.hash(password,10);
        const person = new Data({ fullName, email, password:hashedPassword , uniqueName});
        await person.save();
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    }

    catch(e)
    {
    }
}


export const Google = async (req, res) => {
    try {
        const { fullName, email, profilePicture } = req.body;
        // console.log(req.body);
        const euser = await Data.findOne({ email: email });

        if (euser) {
            return res.status(201).json({
                message: `Welcome back ${euser.fullName}`,
                user: euser,
                success: true
            });
        } else {
            const atIndex = email.indexOf('@');
            const uniqueName = (atIndex !== -1 ? email.substring(0, atIndex) : email) + Math.floor(Math.random() * 1000);
            const password = Math.floor(Math.random() * 100000).toString(); // Ensure password is a string
            const hashedPassword = await bcryptjs.hash(password, 10); // Await the hashing

            const person = new Data({ fullName, email, password: hashedPassword, uniqueName, profilePicture });
            await person.save();

            return res.status(201).json({
                message: `Welcome ${fullName}`,
                user: person,
                success: true,
            });
        }
    } catch (e) {
        // console.log(e);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
};



export const Delete = async( req, res)=>{

    const email = req.body
    
    if(!email)
        return res.status(404).json({ message: 'Item not found' });
 
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







export const Udetails = async( req, res)=>{
   
    const uniqueName = req.query.user
    console.log(uniqueName)
    try {
        const item = await Data.findOne( {uniqueName});

        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({item,  message: 'User details received' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}


///////////////////////////////////////////////////////////


export const Update = async( req, res)=>{
   
    const { _id} = req.body; 
    

    
   

  
  console.log(_id)
  
  
    try {
      const updatedUser = await Data.findByIdAndUpdate(
        _id,  
        {  
             ...(req.body.fullName && { fullName: req.body.fullName }),
             ...(req.body.email && { email: req.body.email }),
             ...(req.body.profilePicture && { profilePicture: req.body.profilePicture }),
        },
        { new: true, runValidators: true }
      );
     
      if (!updatedUser) {
        return res.status(404).json({ message: 'Data not found' });
      }
  
      res.status(200).json({ message: 'Data updated successfully', updatedUser });
    //   console.log(updatedUser)  

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  //////////////////////////////////////////////////////////////////////////////////////
  
  