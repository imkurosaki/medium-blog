import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { signupInput, SignupInput, signinInput, SigninInput } from "@imkeanserna/backend-zod-types";

class User {
    async signupUser(c: Context) {
        const { email, name, password }: SignupInput = await c.req.json();
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const validation: any = signupInput.safeParse({ email, name, password })
        if (!validation.success) {
            return c.json({
                error: validation.error.errors
            }, 411)
        }

        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                }
            });

            return c.json({
                token: `Bearer ${await sign({ id: user.id }, c.env.JWT_SECRET)}`
            })
        } catch (error: any) {
            return c.json({
                error: "Email / Name is already taken, try another one"
            }, 411)
        }
    }

    async signinUser(c: Context) {
        const { email, password }: SigninInput = await c.req.json();
        const prisma = await new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const validation: any = signinInput.safeParse({email, password});
        if (!validation.success) {
            return c.json({
                error: validation.error.errors
            }, 411)
        }

        try {
            const userExist: { id: string, password: string } | null = await prisma.user.findFirst({
                where: {
                    email
                }
            });

            //@ts-expect-error
            if (!bcrypt.compareSync(password, userExist?.password)) {
                return c.json({
                    error: "Password is incorrect"
                }, 411);
            }

            return c.json({
                //@ts-expect-error
                token: `Bearer ${await sign({ id: userExist.id }, c.env.JWT_SECRET)}`
            })
        } catch (error: any) {
            return c.json({
                error: "Email doens't exist, please signup"
            }, 400)
        }
    }
}

export default new User;