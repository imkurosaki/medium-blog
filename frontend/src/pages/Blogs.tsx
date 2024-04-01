import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { isLoadingAtom, postsSelector, userInfoSelector } from "../atoms/userAtom";
import toast, { Toaster } from "react-hot-toast";
import SkeletonPost from "../components/BlogPost/SkeletonCard";
import CardPost from "../components/BlogPost/CardPost";

const dummyArray = [1, 2, 3, 4, 5];

export default function Blogs() {
    const { state, contents }: any = useRecoilValueLoadable<Post[]>(postsSelector)
    const [isLoadingState, setIsLoadingAtom] = useRecoilState<boolean>(isLoadingAtom);
    const userInfoState = useRecoilValue<User | any>(userInfoSelector);

    useEffect(() => {
        if (isLoadingState) {
            setIsLoadingAtom(false);
            toast.success(`Welcome ${userInfoState.name}, create your blog now!`, {
                duration: 5000,
                style: {
                    border: '1px solid #a0a4a1',
                    color: 'black',
                    backgroundColor: 'white',
                    paddingRight: '50px',
                    maxWidth: 500
                },
                iconTheme: {
                    primary: ' 	#32CD32',
                    secondary: '#FFFAEE'
                }
            });
        }
    }, []);

    return <div className="bg-gray-100 px-64 pb-10 pt-24">
        <Toaster
            position="top-left"
            reverseOrder={true}
            toastOptions={{
                style: {
                    maxWidth: 500
                }
            }}
        />
        <div className="space-y-6">
            <div className="flex gap-6 text-gray-500 text-lg">
                <p className="font-medium text-black cursor-pointer">Relevant</p>
                <p className="cursor-pointer">Latest</p>
                <p className="cursor-pointer">Top</p>
            </div>
            {state === "loading"
                ?
                dummyArray.map((id: number) => {
                    return <SkeletonPost key={id} />
                })
                :
                contents.map((post: Post) => {
                    return <CardPost key={post.id} {...post} />
                })
            }
        </div>
    </div>
}