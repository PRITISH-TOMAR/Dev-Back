import express from "express";
import { create, retrieve, Delete, Update, LikeArticle} from "../Controllers/Article.js";
import CheckForAuthenticationCookie from '../MiddleWare/Auth.js'
const RouteArticles = express.Router();

RouteArticles.post("/create", CheckForAuthenticationCookie, create);
RouteArticles.get("/retrieve", retrieve);
RouteArticles.delete("/delete", CheckForAuthenticationCookie, Delete);
RouteArticles.put("/update", CheckForAuthenticationCookie, Update);
RouteArticles.put("/like", CheckForAuthenticationCookie, LikeArticle);



export default RouteArticles;