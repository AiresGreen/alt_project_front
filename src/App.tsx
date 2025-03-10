import {SigninPage} from "@/pages/auth/SigninPage.tsx";
import {SignupPage} from "@/pages/auth/SignupPage.tsx";
import {Routes, Route} from 'react-router-dom';

import {HomeInscritPage} from "@/pages/home/HomeInscritPage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";
import {HomeNonInscritPage} from "@/pages/home/HomeNonInscritPage.tsx";


function App() {
    return (
            <Routes>
                {/* Page d'accueil pour NON-inscrit */}
                <Route path="/" element={<HomeNonInscritPage />} />

                {/* Authentification */}
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Page d'accueil pour INSCRIT (chemin distinct) */}
                <Route path="/home-inscrit" element={<HomeInscritPage />} />

                {/* Pages de footer */}
                <Route path="/apropos" element={<AproposPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            </Routes>

    )
}

export default App;
