import { useState } from "react";
import ButtonForm from "../components/Form/ButtonForm";
import InputForm from "../components/Form/InputForm";
import { SigninInput, signinInput } from '@imkeanserna/backend-zod-types';
import axios from "axios";
import Cookies from "js-cookie";

export default function Signin() {
    const [timer, setTimer] = useState<number>(0);
    const [forms, setForms] = useState<SigninInput>({
        email: "",
        password: "",
    });

    const handleOnChange = (e: any) => {
        clearTimeout(timer);
        const id: number = setTimeout(() => {
            setForms({ ...forms, [e.target.name]: e.target.value });
        }, 300);
        setTimer(id);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = signinInput.safeParse(forms);
        if (!response.success) {
            const errors = JSON.parse(response.error.message);
            console.log(errors[0].message)
            return;
        }

        try {
            const { data } = await axios({
                method: 'post',
                url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/user/signin',
                data: forms
            });
            Cookies.set('access_token', data.token, {
                secure: true,
                path: '/'
            });
        } catch (error: any) {
            console.log(error.response.data.error)
        }
    }

    return <div>
        <div>
            <p>Signin</p>
        </div>
        <form onSubmit={handleSubmit}>
            <InputForm type="text" name="email" placeholder="Email" onChange={handleOnChange} />
            <InputForm type="password" name="password" placeholder="Password" onChange={handleOnChange} />
            <ButtonForm label="Sign in" />
        </form>
    </div>
}