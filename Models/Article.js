
import mongoose from 'mongoose'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { error } from './Error.js';

const Schema = new mongoose.Schema
({
    userId: {
        type: String,
        required: true,
      },
      artId:{
        type: String,
        required:true,
        unique:true
      },
      content: {
        type: String,
        required: true,
      },
      art_name: {
        type: String,
        required: true,
        // unique:false,
      },
      image: {
        type: String,
        default:
          'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
      },
      category: {  
        type: String,
        // default: 'uncategorized',
      },
     
    },
    { timestamps: true }
  );

 const Data = mongoose.model("Article", Schema)   

// ............................................................Data.........
 
export const create = async (req, res) => {
    
    if (!req.body.art_name || !req.body.content || !req.body.category ) {
      return  res.status(400).json({
        message:" Please provide all required fields",
        success:false
         
    })
    } 

    const artId = req.body.art_name
  .split(' ')
  .join('-')
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '') + '-' + (Math.floor(Math.random() * 900) + 100);
   

    const newArt = new Data({
      ...req.body, artId
      
    });
    try {
      const savedPost = await newArt.save();
      return res.status(201).json({
        message:" Congratulations, your new article posted!",
        success:true
         
    })

    
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message:" Oops! Something went Wrong",
        success:true
      })

    }
  };

  /////.............................................................................................

  export const retrieve = async (req, res) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const resData = await Data.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.art_name && { art_name: req.query.art_name }), 
        ...(req.query.artId && { artId: req.query.artId }),
        ...(req.query._id && { artId: req.query._id }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },// regex-mogoose & i means no case sensitive
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const total = await Data.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonth  = await Data.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        resData,
        total,
        lastMonth,
      });
    } catch (error) {
     console.log(error)
    }
  };
  ///////////////////////////////
  

export const Delete = async( req, res)=>{
   
  const _id = req.body._id
  const userId= req.body.userId
  console.log(_id +"c")
  try {
      const item = await Data.findById( _id);

      if(item && item.userId == userId)
      {
            const ditem =await Data.findOneAndDelete(item);

            if(ditem)
            {
              console.log(ditem)
              return res.status(200).json({ message: 'Article Deleted Successfully!' }) 
            }
      }


      return res.status(500).json({ message: 'Unauthorized!' }) 

   
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
}


///////////////////////////////////////////////////////////////
 

export const Update = async( req, res)=>{
   
  // const { id } = req.params;
  const { _id, art_name, content, image, category } = req.body;


  const artId = req.body.art_name
  .split(' ')
  .join('-')
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, '') + '-' + (Math.floor(Math.random() * 900) + 100);

  try {
    const updatedData = await Data.findByIdAndUpdate(
      _id,
      { art_name, content, image, category, artId },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({ message: 'Data updated successfully', updatedData });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};