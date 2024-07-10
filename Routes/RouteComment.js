import express from "express";
import { Create, likeComment, Retrieve, editComment, deleteComment} from "../Models/Comment.js";
const RouteComment = express.Router();

RouteComment.route("/create").post(Create);
RouteComment.route("/retrieve").get(Retrieve);
RouteComment.route("/like").put(likeComment);
RouteComment.route("/edit").put(editComment);
RouteComment.route("/delete").delete(deleteComment);


export default RouteComment;