/** @format */

import express from "express";
const blogRouter = express.Router();
import {getAllBlogs, addBlog, updateBlog, getById, deleteBlog} from "../controllers/blog-controller";

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/id", deleteBlog);


export default blogRouter;
