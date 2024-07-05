
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
        ...(req.query.artId && { _id: req.query.artId }),
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