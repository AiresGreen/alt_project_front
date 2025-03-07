import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoginInterface } from "@/interface/LoginInterface";

export const SigninPage = () => {

const[name,setName]=useState<string>("");
const[firstname,setFirstname]=useState<string>("");
const[email,setEmail]=useState<string>("");
const[password,setPassword]=useState<string>("");
const[passwordconfirmation,setPasswordconfirmation]=useState<string>("");

    const handleSubmit=(e)=>{
    e.preventDefault();
    const data : LoginInterface={
        name:name,
        firstName:firstname,
        email:email,
        password:password,
        passwordconfirmation:passwordconfirmation,
    };
}
    return (
<>
        <img src="../public/logo.png" alt="Logo Balance ton job" className="h-50 m-auto"/>
        <div className="bg-green-300">
           
             <h1 className="font-[var(--font-nunito)] text-center text-6xl bg-gradient-to-r from-cyan-700 to-blue-950 bg-clip-text text-transparent bord "> INSCRIPTION </h1>
            <form className="flex flex-col w-1/3 gap-2.5" onSubmit={handleSubmit}>
                <Input
                type="string"
                placeholder="Votre Nom ?"
                onChange={(e)=>setName(e.target.value)}
                value={login}
                />

            </form>

        </div>
</>
    );
}