import express from "express";
import { Send, Verify} from "../Models/EmailOTP.js";
import { SendMessage } from "../Models/Messages.js";
import { NewsLetter } from "../Models/NewsLetter.js";
const RouteComment = express.Router();

RouteComment.route("/send").post(Send);
RouteComment.route("/verify").get(Verify);
RouteComment.route("/sendmessage").post(SendMessage);
RouteComment.route("/newsLetter").post(NewsLetter);



export default RouteComment;