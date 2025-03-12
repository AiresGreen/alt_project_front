import {Turtle } from "lucide-react";

export default function NotFoundPage() {
    return (
        <>
        
            <div className="flex flex-col items-center justify-center h-screen gap-15">
            <img src="../public/logo.png" alt="Logo Balance ton job" className="max-md:h-25 h-50 max-md:my-8"/>
                <p className="text-4xl font-bold">404 - Page not found</p>
                <Turtle className="w-32 h-32"/>
            </div>
        </>
    )
}