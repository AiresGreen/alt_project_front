import './App.css'
import { Routes, Route } from "react-router-dom";
import { HomePage } from './src/pages/HomePage.tsx';
import {SigninPage} from "@/src/pages/auth/SigninPage.tsx";
import {SignupPage} from "@/src/pages/auth/SignupPage.tsx";


function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

        </Routes>
      </>
  )
}

export default App;
