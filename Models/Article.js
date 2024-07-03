
import mongoose from 'mongoose'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Error } from './Error.js';

const Schema = new mongoose.Schema
({
    userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
        type: String,
        default:
          'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
      },
      category: {
        type: String,
        default: 'uncategorized',
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  );

 const Data = mongoose.model("Articles", Schema) 

// ............................................................Data.........
 
export const create = async (req, res, next) => {
    
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');
    const newArt = new Data({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const savedPost = await newArt.save();
      res.status(201).json(savedPost);
    } catch (error) {
      next(error);
    }
  };
