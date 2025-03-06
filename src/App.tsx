

import {SigninPage} from "../src/pages/auth/SigninPage.tsx";
import {SignupPage} from "../src/pages/auth/SignupPage.tsx";
import { Routes, Route } from 'react-router-dom';

import { HomePage } from "@/pages/home/HomePage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";




function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
              <Route path="/apropos" element={<AproposPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        </Routes>

      </>
  )
}

export default App;
