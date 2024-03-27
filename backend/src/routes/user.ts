import { Hono } from "hono";
import User from "../controller/users";

const user = new Hono();

user.post('/signin', User.signinUser)
user.post('/signup', User.signupUser)

export default user;