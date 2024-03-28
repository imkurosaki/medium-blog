import { useState } from "react";
import InputForm from "../components/Form/InputForm";
import ButtonForm from "../components/Form/ButtonForm";
import axios from "axios";
import Cookies from 'js-cookie';
import { SignupInput, signupInput } from "@imkeanserna/backend-zod-types";

export default function Signup() {
    const [timer, setTimer] = useState<number>(0);
    const [forms, setForms] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    const handleOnChange = (e: any) => {
        clearTimeout(timer)
        const id: number = setTimeout(() => {
            setForms({ ...forms, [e.target.name]: e.target.value })
        }, 300);
        setTimer(id);
    } 

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = signupInput.safeParse(forms);
        if(!response.success) {
            const errors = JSON.parse(response.error.message);
            return;
        }

        try {
            const { data } = await axios({
                method: 'post',
                url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/user/signup',
                data: forms
            })
            Cookies.set('access_token', data.token, {
                secure: true, 
                path: '/'
            });
        } catch (error: any) {
            console.log(error.response.data.error)
        }
    };

    return <div>
        <div>
            Signup Page
        </div>
        <form onSubmit={handleSubmit}>
            <InputForm type="text" name="name" onChange={handleOnChange} placeholder="Name" />
            <InputForm type="text" name="email" onChange={handleOnChange} placeholder="Email" />
            <InputForm type="password" name="password" onChange={handleOnChange} placeholder="Password" />
            <ButtonForm label="Sign Up" />
        </form>
    </div>
}
