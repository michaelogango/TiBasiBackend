import  express  from "express";
import {  signup } from "../controllers/users.js";
const router = express.Router();
//router.post ('/login',login);
router.post ('/signup',signup);
export default router;

//this is to check routes 