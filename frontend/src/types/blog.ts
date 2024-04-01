type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    published: boolean;
    authorId: string;
    author: User;
}

type Props = {
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
}

type HeaderPost = {
    name: string;
    day: number;
    month: number;
    year: number;
}

type ButtonProps = Pick<Props, "name" | "onChange">