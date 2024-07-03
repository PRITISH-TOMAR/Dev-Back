import express from "express";
import {Newuser} from '../Models/User.js'
import { create} from "../Models/Article.js";
const RouteArticles = express.Router();

RouteArticles.route("/create").post(create);


export default RouteArticles;