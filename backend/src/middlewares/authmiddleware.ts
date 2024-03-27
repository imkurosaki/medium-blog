import { Context, MiddlewareHandler, Next } from "hono";
import { verify } from "hono/jwt";

const authmiddleware: MiddlewareHandler = async (c: Context, next: Next) => {
    const tokenToVerify = c.req.header('Authorization')?.split("Bearer ")[1];

    if (!tokenToVerify) {
        return c.json({
            error: "Unauthorized token"
        }, 411)
    }

    try {
        const decodedPayload: { id: string } = await verify(tokenToVerify, c.env.JWT_SECRET);

        if (!decodedPayload.id) {
            throw new Error;
        }
        c.set("userId", decodedPayload.id)
        await next();
    } catch (error: any) {
        return c.json({
            error: "Unauthorized token"
        }, 411)
    }
}

export default authmiddleware;