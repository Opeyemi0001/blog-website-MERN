import express from 'express'
import { adminLogin } from '../controllers/adminController.js';

const adminRouter = express.Router();

// Route for admin login
adminRouter.post("/login", adminLogin);

export default adminRouter;