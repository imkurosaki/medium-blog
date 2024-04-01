type User = {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
}

type UserResponse = {
    token: string;
    message: string;
    user: User
}