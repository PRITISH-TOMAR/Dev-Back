import express from "express";
import {Newuser} from '../Models/User.js'
import { Login , Logout, Google, Delete, Udetails} from "../Models/User.js";
import { Update } from "../Models/User.js";
const Routemain = express.Router();

Routemain.route("/newuser").post(Newuser);
Routemain.route("/login").post(Login); 
Routemain.route("/logout").get(Logout);
Routemain.route("/google").post(Google);
Routemain.route("/delete").delete(Delete);
Routemain.route("/user").get(Udetails);
Routemain.route("/update").put(Update);

export default Routemain;