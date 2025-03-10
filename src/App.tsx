import {SigninPage} from "@/pages/auth/SigninPage.tsx";
import {SignupPage} from "@/pages/auth/SignupPage.tsx";
import {Routes, Route} from 'react-router-dom';

import {HomeInscritPage} from "@/pages/home/HomeInscritPage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";
import {HomeNonInscritPage} from "@/pages/home/HomeNonInscritPage.tsx";
import {CvConstructPage} from "@/pages/cv/CvConstructPage.tsx";


function MyCvPage() {
    return null;
}

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

                {/* Page de constructeur de CV */}
                <Route path={"/cv-builder"} element={<CvConstructPage />} />

                {/* Page de mes CV */}
                <Route path={"/cv"} element={<MyCvPage />} />

            </Routes>

    )
}

export default App;
