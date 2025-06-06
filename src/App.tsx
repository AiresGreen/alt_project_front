// App.tsx
import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import { AuthContext } from "@/hook/contexts/auth.context";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// Importation de layouts
import AdaptiveLayout from "@/components/layouts/AdaptiveLayout.tsx";
import PublicRoute from "@/utils/PublicRoute.tsx";
import PrivateRoute from "@/utils/PrivateRoute.tsx";

// Importation de pages
import { SignupPage } from "@/pages/auth/SignupPage.tsx";
import AproposPage from "@/pages/footer/AproposPage.tsx";
import ContactPage from "@/pages/footer/ContactPage.tsx";
import MentionsLegalesPage from "@/pages/footer/MentionsLegalePage.tsx";
import { CvConstructPage } from "@/pages/cv/CvConstructPage.tsx";
import { LoginPage } from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { LoginRecoveryPage } from "./pages/auth/LoginRecoveryPage.tsx";
import { PasswordRecoveryPage } from "./pages/auth/PasswordRecoveryPage";
import MyCvPage from "./pages/cv/MyCvPage";
import { CandidatePage } from "./pages/candidate/CandidatePage";
import { EmployerPage } from "@/pages/candidate/EmployerPage.tsx";
import OffersOfEmployerPage from "@/pages/candidate/OffersOfEmployerPage.tsx";
import ContactEmployeeListPage from "@/pages/contact/ContactEmployeeListPage.tsx";
import { CvCandidatePage } from "@/pages/candidate/CvCandidatePage.tsx";
import FolowApplicationPage from "@/pages/follow/FolowApplicationPage.tsx";
import { ProfilePicturePage } from "@/pages/profilePicture/ProfilePicturePage.tsx";
import RepeatApplicationPage from "@/pages/follow/RepeatApplicationPage.tsx";
import QuestionPage from "@/pages/follow/QuestionPage.tsx";
import EditQuestionPage from "@/pages/follow/EditQuestionPage.tsx";
import ChoiceForSendingQuestionnerPage from "@/pages/follow/ChoiceForSendingQuestionnerPage.tsx";
import FavoritePage from "@/pages/favorite/FavoritePage.tsx";
import OfferPage from "@/pages/offer/OfferPage.tsx";
import EnterprisePage from "@/pages/enterprise/EnterprisePage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import MesRecommandations from "@/pages/recomendation/RecomendationPage.tsx";
import EducationListePage from "@/pages/education/EducationListPage.tsx";
import ExperienceListePage from "@/pages/experience/ExperienceListPage.tsx";
import PersonalInfosList from "@/pages/personnalInfos/PersonnalInfosList.tsx";
import { UsefulInfosList } from "@/pages/personnalInfos/UsefulInfosList.tsx";
import { PrivacyPolicyPage } from "@/pages/footer/PrivacyPolicyPage.tsx";
import HobbiesListPage from "@/pages/hobbies/HobbiesListPage.tsx";
import { LanguagesListPage } from "@/pages/languages/LanguagesListPage.tsx";
import ProjectsListPage from "@/pages/projects/ProjectsListPage.tsx";
import { SkillsListPage } from "@/pages/skills/SkillsListPage.tsx";
import { ProfileDetailsPage } from "@/pages/profile/ProfileDetailsPage.tsx";
import VerificationEnAttentePage from "./pages/VerificationEnAttentePage.tsx";


function App() {
    // Détecte si l'appareil est mobile (largeur <= 767px)
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    console.log(isMobile);

    // Récupération de l'état d'authentification depuis le contexte
    const { isAuthenticated } = useContext(AuthContext);
    console.log("isAuthenticated in App.tsx:", isAuthenticated);

    return (
        <>
        <Routes>
            {/* Routes Publiques */}
            <Route element={<PublicRoute />}>
                <Route element={<AdaptiveLayout />}>
                    <Route path="/signin" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/loginrecovery" element={<LoginRecoveryPage />} />
                    <Route path="/passwordrecovery" element={<PasswordRecoveryPage />} />
                </Route>
            </Route>

            {/* Routes Mixtes (accessible aussi bien par connecté que non) */}
            <Route element={<AdaptiveLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/offer/:id" element={<OfferPage />} />
                <Route path="/enterprise-info" element={<EnterprisePage />} />
                <Route path="/apropos" element={<AproposPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
                <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
            </Route>

            {/* Routes Privées */}
            <Route element={<PrivateRoute />}>
                <Route element={<AdaptiveLayout />}>
                    <Route path="/cv-build" element={<CvConstructPage />} />
                    <Route path="/cv" element={<MyCvPage />} />
                    <Route path="/candidate-page" element={<CandidatePage />} />
                    <Route path="/employer-page" element={<EmployerPage />} />
                    <Route path="/offers-of-employer" element={<OffersOfEmployerPage />} />
                    <Route path="/contact-list" element={<ContactEmployeeListPage />} />
                    <Route path="/cv-candidate" element={<CvCandidatePage />} />
                    <Route path="/applications" element={<FolowApplicationPage />} />
                    <Route path="/profile-picture" element={<ProfilePicturePage />} />
                    <Route path="/repeat-application" element={<RepeatApplicationPage />} />
                    <Route path="/questionner" element={<QuestionPage />} />
                    <Route path="/edit-questionner" element={<EditQuestionPage />} />
                    <Route path="/choose-questionner" element={<ChoiceForSendingQuestionnerPage />} />
                    <Route path="/favorite" element={<FavoritePage />} />
                    <Route path="/recommandations" element={<MesRecommandations />} />
                    <Route path="/education" element={<EducationListePage />} />
                    <Route path="/experience" element={<ExperienceListePage />} />
                    <Route path="/personal-infos" element={<PersonalInfosList />} />
                    <Route path="/info-zutile" element={<UsefulInfosList />} />
                    <Route path="/hobbies" element={<HobbiesListPage />} />
                    <Route path="/languages/" element={<LanguagesListPage />} />
                    <Route path="/projects" element={<ProjectsListPage />} />
                    <Route path="/skills" element={<SkillsListPage />} />
                    <Route path="/profile-page/" element={<ProfileDetailsPage />} />
                </Route>
            </Route>

            {/* Route pour page non trouvée */}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/verification-en-attente" element={<VerificationEnAttentePage />} />

        </Routes>

    <ReactQueryDevtools/>
        </>
    );
}

export default App;
