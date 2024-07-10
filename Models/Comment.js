import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    artId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
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

const Comment = mongoose.model('Comment', commentSchema);


export const Create = async (req, res) => {
  try {
    const { content, artId, userId } = req.body;

    if (!userId) {
      return  res.status(403).json({message:"Forbidden"});
      
    }
    
    const newComment = new Comment({
      content,
      artId,
      userId,
    });
    await newComment.save();
    
    res.status(200).json({newComment,
        message:"Done"}
    ); 
} catch (error) {
      return  res.status(500).json({message: "Internal error"});
  }
};

export const Retrieve = async (req, res) => {
   const artId = req.query.artId
  try {
    const comments = await Comment.find({ artId }).sort({updatedAt:-1})
    return res.status(200).json({message:'OK', comments});
} catch (error) {
   return res.status(500).json("Errorr");
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.query.cid);
    const userId = req.query.user
    console.log(userId)
    if (!comment) {
      return res.status(404).json({message: 'Comment not found'});
    }
    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json({comment});
  } catch (error) {
    res.status(500).json({ message: "Error Occured !"})
  }
};

export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.body._id);
    const editedComment =req.body.content 
    if (!comment) {
      return res.status(404).json({ message:'Comment not found'}) ;
    }
   

    const edited = await Comment.findByIdAndUpdate( req.body._id,
      {
        content: editedComment,
      },
      { new: true }
    );
    res.status(200).json({edited});
  } catch (error) {
    // next(error);
    res.status(500).json("Comment Undefined");
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.query.id);
    if (!comment) {
      return res.status(400).json('Comment not found');
    }
   
    await Comment.findByIdAndDelete(req.query.id);
    res.status(200).json('Comment has been deleted');
  } catch (error) {
    res.status(500).json('Internal error');
  }
};
