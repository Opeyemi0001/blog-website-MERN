import express from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../configs/middleware/multer.js";
import auth from "../configs/middleware/auth.js";

const blogRouter = express.Router();

// Route to add a new blog 
blogRouter.post("/add", upload.single('image'), auth, addBlog);

export default blogRouter;
