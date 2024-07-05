import express from "express";
import {Newuser} from '../Models/User.js'
import { create, retrieve} from "../Models/Article.js";
const RouteArticles = express.Router();

RouteArticles.route("/create").post(create);
RouteArticles.route("/retrieve").get(retrieve);


export default RouteArticles;