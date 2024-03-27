import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, CreatePostInput, updatePostInput, UpdatePostInput } from "@imkeanserna/backend-zod-types";

class Blog {
    async createBlog(c: Context) {
        const { title, content }: CreatePostInput = await c.req.json();
        const userId: string = c.get("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const validation: any = createPostInput.safeParse({title, content});
        if(!validation.success) {
            return c.json({
                error: validation.error.errors
            }, 411)
        }

        try {
            await prisma.blog.create({
                data: {
                    title,
                    content,
                    authorId: userId
                }
            })
            return c.json({
                message: "Your blog post is successfully created"
            })
        } catch (error: any) {
            return c.json({
                error: "There's something creating your post, try again later"
            }, 500)
        }
    }

    async updateBlog(c: Context) {
        const { title, content }: UpdatePostInput = await c.req.json();
        const id = c.req.param("id");
        const userId = c.get("userId")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const validation:any = updatePostInput.safeParse({title, content});
        if(!validation.success) {
            return c.json({
                error: validation.error.errors
            }, 411);
        }

        try {
            await prisma.blog.update({
                where: {
                    id: id,
                    authorId: userId
                },
                data: {
                    title: title || undefined,
                    content: content || undefined
                }
            })
            return c.json({
                message: "Your blog post is successfully updated"
            })
        } catch (error: any) {
            return c.json({
                error: "Blog post is not found"
            }, 404)
        }
    }

    async getBlogById(c: Context) {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findUnique({
            where: {
                id: id
            }
        });

        if (!blog) {
            return c.json({
                error: "Blog post doesn't found"
            })
        }
        return c.json({ blog });
    }

    async getBlogs(c: Context) {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blogs = await prisma.blog.findMany({});
        return c.json({ blogs });
    }
}

export default new Blog;