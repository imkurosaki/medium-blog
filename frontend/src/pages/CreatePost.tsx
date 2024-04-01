import { useEffect, useState } from "react"
import { createPostInput, CreatePostInput } from "@imkeanserna/backend-zod-types"
import axios, { AxiosPromise } from "axios";
import { InputContent, InputTitle } from "../components/BlogPost/Form";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const [timer, setTimer] = useState<number>(0);
    const [forms, setForms] = useState<CreatePostInput>({
        title: "",
        content: ""
    });
    const navigate = useNavigate();

    const handleOnChange = (e: any) => {
        clearTimeout(timer);
        const id: number = setTimeout(() => {
            console.log(forms)
            setForms({ ...forms, [e.target.name]: e.target.value });
        }, 300)
        setTimer(id);
    }

    const handlePublish = async () => {
        const response = createPostInput.safeParse(forms);
        if (!response.success) {
            const errors: Object[] | any = JSON.parse(response.error.message);
            toast.error(errors[0].message, {
                style: {
                    border: '1px solid #a0a4a1',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '16px',
                    maxWidth: 500
                },
                iconTheme: {
                    primary: '#070504',
                    secondary: '#FFFAEE'
                }
            });
            return;
        }

        const cookie: string = document.cookie.split("access_token=")[1];
        const promise: Promise<AxiosPromise> = axios({
            method: 'post',
            url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/blog',
            data: forms,
            headers: {
                'Auth-token': cookie,
                'Content-Type': 'application/json'
            }
        });
        toast.promise(promise, {
            loading: 'Creating your blog',
            success: (response: any) => {
                if(!response.data) throw new Error("erorr");
                navigate("/blogs")
                window.location.reload();
                return response.data.message;
            },
            error: (error: any) => {
                return "Something is error, try again"
            }
        })
    }

    useEffect(() => {

    }, [forms])

    return <div className="px-56 h-screen pt-24 bg-gray-100">
        <Toaster
            position="top-left"
            reverseOrder={true}
            toastOptions={{
                style: {
                    maxWidth: 500
                }
            }}
        />
        <div className="h-full space-y-4 ">
            <div className="h-[90%] py-12 bg-white border space-y-3 border-slate-200 rounded-md overflow-y-auto">
                <div className="px-12">
                    <InputTitle name="title" placeholder="New post title here..." onChange={handleOnChange} />
                </div>
                <div className="h-14 bg-gray-200"></div>
                <div className="px-12">
                    <InputContent name="content" placeholder="Write your post content here..." onChange={handleOnChange} />
                </div>
            </div>
            <Button name="Publish" onChange={handlePublish} />
        </div>
    </div>
}