import express from "express";
import { Send, Verify } from "../Models/Email.js";
const RouteComment = express.Router();
RouteComment.route("/send").post(Send);
RouteComment.route("/verify").get(Verify);
export default RouteComment;