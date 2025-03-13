// App
import {Routes, Route} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useContext} from "react";
import {AuthContext} from "@/hook/contexts/auth.context";


// Importation de pages
import {SigninPage} from "@/pages/auth/SigninPage.tsx";
import {HomeInscritPage} from "@/pages/home/HomeInscritPage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";
import {HomeNonInscritPage} from "@/pages/home/HomeNonInscritPage.tsx";
import {CvConstructPage} from "@/pages/cv/CvConstructPage.tsx";
import { LoginPage } from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { LoginRecoveryPage } from "./pages/auth/LoginRecoveryPage.tsx";
import { PasswordRecoveryPage } from "./pages/auth/PasswordRecoveryPage";
import MyCvPage from "./pages/cv/MyCvPage";

// Importation de layouts
import {PublicMobileLayout} from "@/components/layouts/PublicMobileLayout";
import {PublicPcLayout} from "@/components/layouts/PublicPcLayout";
import {PrivateMobileLayout} from "@/components/layouts/PrivateMobileLayout";
import {PrivatePcLayout} from "@/components/layouts/PrivatePcLayout";
import PublicRoute from "@/utils/PublicRoute.tsx";
import PrivateRoute from "@/utils/PrivateRoute.tsx";


function App() {
    // Détecte si l'appareil est mobile (largeur <= 767px)
    const isMobile = useMediaQuery({query: "(max-width: 767px)"});
    console.log(isMobile);

    // Récupération de l'état d'authentification depuis le contexte
    const {isAuthenticated} = useContext(AuthContext);

    return (
            <Routes>
                {/* Page d'accueil pour NON-inscrit */}
                <Route path="/" element={<HomeNonInscritPage />} />

                {/* Authentification */}
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/LoginRecoveryPage" element={<LoginRecoveryPage/>}/>
                <Route path="/PasswordRecoveryPage" element={<PasswordRecoveryPage/>}/>

                {/* Page d'accueil pour INSCRIT (chemin distinct) */}
                <Route path="/home-inscrit" element={<HomeInscritPage />} />

                {/* Pages de footer */}
                <Route path="/apropos" element={<AproposPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Routes>
            {/* Routes Publiques */}
            <Route element={<PublicRoute/>}>
                <Route element={isMobile ? <PublicMobileLayout/> : <PublicPcLayout/>}>
                    <Route path="/"
                           element={<HomeNonInscritPage/>}/>
                    <Route path="/apropos"
                           element={<AproposPage/>}/>
                    <Route path="/contact"
                           element={<ContactPage/>}/>
                    <Route path="/mentions-legales"
                           element={<MentionsLegalesPage/>}/>
                    <Route path="/signin"
                           element={<SigninPage/>}/>
                    <Route path="/login"
                           element={<LoginPage/>}/>

                </Route>
            </Route>

                {/* Page de mes CV */}
                <Route path={"/cv"} element={<MyCvPage />} />

                {/* Route page non trouvée */}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>

    )
            {/* Routes Privées */}
            {isAuthenticated && (
                <Route element={<PrivateRoute/>}>
                    <Route element={isMobile ? <PrivateMobileLayout/> : <PrivatePcLayout/>}>
                        <Route path="/home-inscrit"
                               element={<HomeInscritPage/>}/>
                        <Route path="/apropos"
                               element={<AproposPage/>}/>
                        <Route path="/contact"
                               element={<ContactPage/>}/>
                        <Route path="/mentions-legales"
                               element={<MentionsLegalesPage/>}/>
                        <Route path="/cv-builder"
                               element={<CvConstructPage/>}/>
                        <Route path="/cv"
                               element={<MyCvPage/>}/>
                    </Route>
                </Route>
            )}
        </Routes>
    );
}

export default App;
