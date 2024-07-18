import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  artId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  numberOfLikes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
const Comment = mongoose.model('comments', commentSchema);
export const Create = async (req, res) => {
  try {
    const {
      content,
      artId,
      userId
    } = req.body;
    if (!userId) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }
    const newComment = new Comment({
      content,
      artId,
      userId
    });
    await newComment.save();
    res.status(200).json({
      newComment,
      message: "Done"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error"
    });
  }
};
export const Retrieve = async (req, res) => {
  const order = req.query.order || 'asc';
  //  const sortDirection = order=== 'asc' ? 1 : -1;

  try {
    let comments = await Comment.find({
      ...(req.query.userId && {
        userId: req.query.userId
      }),
      ...(req.query.artId && {
        artId: req.query.artId
      })
    }).sort({
      createdAt: -1
    });
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonth = await Comment.countDocuments({
      createdAt: {
        $gte: oneMonthAgo
      },
      ...(req.query.userId && {
        userId: req.query.userId
      })
    });
    const total = await Comment.countDocuments({
      ...(req.query.userId && {
        userId: req.query.userId
      })
    });
    return res.status(200).json({
      message: 'OK',
      comments,
      total,
      lastMonth
    });
  } catch (error) {
    return res.status(500).json("Errorr");
  }
};
export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.query.cid);
    const userId = req.query.user;
    console.log(userId);
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
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
    res.status(200).json({
      comment
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Occured !"
    });
  }
};
export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.body._id);
    const editedComment = req.body.content;
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    const edited = await Comment.findByIdAndUpdate(req.body._id, {
      content: editedComment
    }, {
      new: true
    });
    res.status(200).json({
      edited
    });
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