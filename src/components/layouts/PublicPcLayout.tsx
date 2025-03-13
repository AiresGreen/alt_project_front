import {Link, Outlet} from "react-router-dom";
import {NavigationBarNonInscrit} from "@/components/navigationBar/NavigationBar.tsx";

export const PublicPcLayout = () => {
    return (
        <div className="bg-custom-pc flex flex-col min-h-screen">
            <header className="bg-emerald-200 text-white p-4">
                <NavigationBarNonInscrit/>
            </header>

            <div className="flex flex-1">

                <main className="flex-1 p-4">
                    <Outlet />
                </main>

            </div>

            <footer className="bg-gray-800 text-white p-4 text-center">
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
