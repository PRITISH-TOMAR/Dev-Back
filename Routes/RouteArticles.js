import express from "express";
import {Newuser} from '../Models/User.js'
import { create, retrieve, Delete, Update} from "../Models/Article.js";
const RouteArticles = express.Router();

RouteArticles.route("/create").post(create);
RouteArticles.route("/retrieve").get(retrieve);
RouteArticles.route("/delete").delete(Delete);
RouteArticles.route("/update").put(Update);


export default RouteArticles;