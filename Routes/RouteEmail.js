import express from "express";
import { Send, Verify} from "../Models/EmailOTP.js";
import { SendMessage } from "../Models/Messages.js";
const RouteComment = express.Router();

RouteComment.route("/send").post(Send);
RouteComment.route("/verify").get(Verify);
RouteComment.route("/sendmessage").post(SendMessage);



export default RouteComment;