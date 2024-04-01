import { useParams } from "react-router-dom"
import { useRecoilValueLoadable } from "recoil";
import { postSelectorFamily } from "../atoms/userAtom";
import SkeletonPost from "../components/BlogPost/SkeletonPost";
import Post from "../components/BlogPost/Post";

export default function Blog() {
    const { id }: any = useParams<string>();
    const { state, contents } = useRecoilValueLoadable(postSelectorFamily(id))

    return <div className="min-h-screen px-8 pt-16 bg-gray-100">
        <div className="px-40 py-12">
            {state === "loading"
                ?
                <SkeletonPost />
                :
                <div>
                    <Post {...contents.blog}/>
                </div>
            }
        </div>
    </div>
}