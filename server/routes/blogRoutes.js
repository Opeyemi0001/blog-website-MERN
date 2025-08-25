import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogController.js";
import upload from "../configs/middleware/multer.js";
import auth from "../configs/middleware/auth.js";

const blogRouter = express.Router();

// Route to add a new blog 
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete',  auth,  deleteBlogById);
blogRouter.post('/toggle-publish', auth,  togglePublish);
blogRouter.post('add-comment', addComment);
blogRouter.post('comments', getBlogComments);

export default blogRouter;
