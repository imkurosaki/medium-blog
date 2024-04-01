import { useEffect, useState } from "react";
import ButtonForm from "../components/Form/ButtonForm";
import InputForm from "../components/Form/InputForm";
import { SigninInput, signinInput } from '@imkeanserna/backend-zod-types';
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { isLoadingAtom } from "../atoms/userAtom";

export default function Signin() {
    const [timer, setTimer] = useState<number>(0);
    const setIsLoadingAtom = useSetRecoilState<boolean>(isLoadingAtom);
    const [forms, setForms] = useState<SigninInput>({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e: any) => {
        clearTimeout(timer);
        const id: number = setTimeout(() => {
            setForms({ ...forms, [e.target.name]: e.target.value });
        }, 200);
        setTimer(id);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response: any = signinInput.safeParse(forms);

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

        try {
            setIsLoadingAtom(true);
            const { data } = await axios<UserResponse>({
                method: 'post',
                url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/user/signin',
                data: forms,
                withCredentials: true,
            });
            Cookies.set('access_token', data.token, {
                path: '/',
                secure: true,
                sameSite: 'Strict'
            });
            localStorage.setItem('user-info', JSON.stringify(data.user));
            navigate("/blogs");
        } catch (error: any) {
            setIsLoadingAtom(false);
            toast.error(error.response.data.error, {
                style: {
                    border: '1px solid #a0a4a1',
                    color: 'black',
                    backgroundColor: 'white',
                    paddingRight: '50px',
                    maxWidth: 500
                },
                iconTheme: {
                    primary: '#070504',
                    secondary: '#FFFAEE'
                }
            });
        }
    }

    useEffect(() => { }, [forms])

    return <div className="grid grid-cols-2 h-screen items-center">
        <div className="col-span-1 order-last h-screen flex items-center justify-center border bg-gray-200">
            <div className="w-8/12">
                <p className="font-bold text-8xl">Medium</p>
                <p className="font-bold text-xl text-gray-700 mt-2">Where good ideas finds you</p>
            </div>
        </div>
        <div className="col-span-1 px-40">
            <div className="text-center">
                <p className="text-4xl font-bold">Sign in</p>
                <p className="text-gray-500 mt-2">Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <InputForm type="text" name="email" placeholder="Email" onChange={handleOnChange} />
                <InputForm type="password" name="password" placeholder="Password" onChange={handleOnChange} />
                <div className="mt-6">
                    <ButtonForm label="Sign in" />
                    <Toaster 
                    position="bottom-right" 
                    reverseOrder={true} 
                    toastOptions={{
                        style: {
                            maxWidth: 500
                        }
                    }}/>
                </div>
            </form>
        </div>
    </div>
}