import React from "react";
import App from "./App";
import { AuthProvider } from "./hook/contexts/auth.context";
import { BrowserRouter } from "react-router-dom";
import {createRoot} from "react-dom/client";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
);