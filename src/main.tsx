import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from '@/hook/contexts/auth.context'

// Importer le QueryClient et QueryClientProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Instancier un new QueryClient
const queryClient = new QueryClient();

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(

    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
)