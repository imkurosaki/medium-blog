import { Header, Profile } from "./Header";

export default function Post(post: Post) {
    const date: Date = new Date(post.createdAt);
    const author: string = post.author.name;

    return <div className="bg-white rounded-md w-full mx-auto">
        <div className="border border-slate-200 space-y-6 px-16 pt-10 pb-24">
            <div className="flex space-x-4 ">
                <Profile firstLetter={post.author.name[0]} />
                <Header
                    name={author.charAt(0).toUpperCase() + author.slice(1)}
                    day={date.getDay()}
                    month={date.getMonth()}
                    year={date.getFullYear()}
                />
            </div>
            <div className="space-y-12">
                <p className="font-semibold text-6xl pe-62 leading-tight">{post.title}</p>
                <div className="space-y-2">
                    <p className="text-lg whitespace-pre-wrap">{post.content}</p>
                </div>
            </div>
        </div>
        <div className="min-h-[200px] border-x border-b border-slate-200 px-16 pt-10">
            <p className="font-medium text-2xl">Top comments <span className="text-xs font-light">(comming soon)</span></p>
        </div>
    </div>
}