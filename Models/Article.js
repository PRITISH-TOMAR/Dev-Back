
import mongoose from 'mongoose'

const Schema = new mongoose.Schema
  ({
    userId: {
      type: String,
      required: true,
    },
    artId: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true,
    },
    art_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },

  },
    { timestamps: true }
  );

const Data = mongoose.model("articles", Schema)

export default Data
