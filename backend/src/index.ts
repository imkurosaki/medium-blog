import { Hono } from 'hono'
import user from "./routes/user"
import blog from './routes/blog';

const app = new Hono<{
    Variables: {
        userId: string
    }, 
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

app.route("/api/v1/user", user)
app.route("/api/v1/blog", blog)

export default app;