import { Hono } from "hono";
import Blog from "../controller/blogs"
import authmiddleware from "../middlewares/authmiddleware";

const blog = new Hono();

blog.post("/", authmiddleware, Blog.createBlog);
blog.put("/:id", authmiddleware, Blog.updateBlog);
blog.get("/bulk", Blog.getBlogs);
blog.get("/:id", authmiddleware, Blog.getBlogById);

export default blog;