import express from "express";
import { Send, Verify} from "../Controllers/EmailOTP.js";
import { SendMessage } from "../Controllers/Messages.js";
import { NewsLetter } from "../Controllers/NewsLetter.js";
const RouteComment = express.Router();

RouteComment.route("/send").post(Send);
RouteComment.route("/verify").get(Verify);
RouteComment.route("/sendmessage").post(SendMessage);
RouteComment.route("/newsLetter").post(NewsLetter);



export default RouteComment;