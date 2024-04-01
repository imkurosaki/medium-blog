import { useNavigate } from "react-router-dom";
import Card from "./Card"
import { Header, Profile } from "./Header";

export default function CardPost(post: Post) {
    const date: Date = new Date(post.createdAt);
    const author: string = post.author.name;

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/blog/${post.id}`);
    }

    return <Card>
        <div onClick={handleClick} className="flex space-x-4 px-10 pt-10 pb-4 ">
            <Profile firstLetter={post.author.name[0]}/>
            <div className="flex-1 space-y-6">
                <Header
                    name={author.charAt(0).toUpperCase() + author.slice(1)}
                    day={date.getDay()}
                    month={date.getMonth()}
                    year={date.getFullYear()}
                />
                <div className="space-y-4">
                    <div className="text-2xl font-medium cursor-pointer group-hover:text-blue-700">{post.title.charAt(0).toUpperCase() + post.title.slice(1)}</div>
                    <div className="text-sm line-clamp-3">{post.content.charAt(0).toUpperCase() + post.content.slice(1)}</div>
                </div>
                <div className="flex gap-5 pt-6">
                    <button className="text-sm font-light cursor-pointer">{post.likes} Reactions</button>
                    <button className="text-sm font-light cursor-pointer">Comments</button>
                </div>
            </div>
        </div>
    </Card>
}