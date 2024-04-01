import { useEffect, useState } from "react";
import InputForm from "../components/Form/InputForm";
import ButtonForm from "../components/Form/ButtonForm";
import axios from "axios";
import Cookies from 'js-cookie';
import { SignupInput, signupInput } from "@imkeanserna/backend-zod-types";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { isLoadingAtom } from "../atoms/userAtom";

export default function Signup() {
    const [timer, setTimer] = useState<number>(0);
    const setIsLoadingAtom = useSetRecoilState<boolean>(isLoadingAtom);
    const [forms, setForms] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleOnChange = (e: any) => {
        clearTimeout(timer)
        const id: number = setTimeout(() => {
            setForms({ ...forms, [e.target.name]: e.target.value })
        }, 200);
        setTimer(id);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = signupInput.safeParse(forms);
        if (!response.success) {
            const errors: Object[] | any = JSON.parse(response.error.message);
            toast.error(errors[0].message, {
                style: {
                    border: '1px solid #a0a4a1',
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '16px',
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
                url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/user/signup',
                data: forms
            })
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
                    paddingRight: '50px'
                },
                iconTheme: {
                    primary: '#070504',
                    secondary: '#FFFAEE'
                }
            });
        }
    };

    useEffect(() => { }, [forms]);

    return <div className="grid grid-cols-2 h-screen items-center">
        <div className="col-span-1 order-last h-screen flex items-center justify-center border bg-gray-200">
            <div className="w-8/12">
                <p className="font-medium text-2xl">"The customer service I received wass exceptional. The support team went above and beyond to address m concerns."</p>
                <div className="mt-5">
                    <p className="font-medium">Jules Winnfield</p>
                    <p className="text-gray-700 text-sm">CEO, Acme Inc</p>
                </div>
            </div>
        </div>
        <div className="col-span-1 px-40">
            <div className="text-center">
                <p className="text-4xl font-bold">Create an account</p>
                <p className="text-gray-500 mt-2">Already have an account? <Link to="/signin">Login</Link></p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <InputForm type="text" name="name" placeholder="Username" onChange={handleOnChange} />
                <InputForm type="text" name="email" placeholder="Email" onChange={handleOnChange} />
                <InputForm type="password" name="password" placeholder="Password" onChange={handleOnChange} />
                <div className="mt-6">
                    <ButtonForm label="Sign up" />
                    <Toaster position="bottom-right" reverseOrder={true} />
                </div>
            </form>
        </div>
    </div>
}
