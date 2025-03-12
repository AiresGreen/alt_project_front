import {Link, Outlet} from "react-router-dom";
import { NavigationBarNonInscrit } from "@/components/navigationBar/NavigationBar.tsx";

export const PublicMobileLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-emerald-200 text-white p-2">
                <NavigationBarNonInscrit />
            </header>

            <main className="flex-1 p-2">
                <Outlet />
            </main>

            <footer className="mt-8 border-t py-4 text-center text-sm text-gray-600">
                <div className="mb-2 space-x-4">
                    <Link to="src/pages/footer/AproposPage.tsx"
                          className="hover:underline">
                        À propos
                    </Link>
                    <Link to="src/pages/footer/ContactPage.tsx"
                          className="hover:underline">
                        Contact
                    </Link>
                    <Link to="src/pages/footer/MentionsLegalePage.tsx"
                          className="hover:underline">
                        Mentions légales
                    </Link>
                </div>
                <p>© 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.</p>
            </footer>
        </div>
    );
};
