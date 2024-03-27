import {z} from "zod"

export const signupInput = z.object({
    email: z.string().email({ message: "Email invalid input"}),
    name: z.string().min(2, {message: "Name must be 2 or more characters long"}).max(40, {message: "Name must be 40 below characeters long"}),
    password: z.string().min(5, {message: "Password must be 5 or more characters long"}).max(12, {message: "Password must be 12 below characters long"})
});

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email: z.string().email({ message: "Email invalid input"}),
    password: z.string().min(5, {message: "Password must be 5 or more characters long"}).max(12, {message: "Password must be 12 below characters long"})
});

export type SigninInput = z.infer<typeof signinInput>

export const createPostInput = z.object({
    title: z.string().min(4, {message: "Title must be 4 or more characters long"}).max(40, {message: "Title must be 40 below characters long"}),
    content: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof createPostInput>

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdatePostInput = z.infer<typeof updatePostInput>