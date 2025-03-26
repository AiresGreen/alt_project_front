import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {AuthProvider} from '@/hook/contexts/auth.context'
import { Toaster } from "sonner"

// Importer le QueryClient et QueryClientProvider
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {CandidateProvider} from "@/hook/contexts/candidates.context.tsx";

// Instancier un new QueryClient
const queryClient = new QueryClient();

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <CandidateProvider>
                    <AuthProvider>
                        <App/>
                        <Toaster position="top-right" richColors />
                    </AuthProvider>
                </CandidateProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)