import {SigninInterface} from "@/types/auth.ts";
import {useState} from "react";

export const SigninPage = () => {
    const [form, setForm] = useState<SigninInterface>({
        email: "",
        password: "",
    });

    return (

        <div>
            <h1>Signin Page</h1>
        </div>
    );
}