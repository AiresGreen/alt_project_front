import {Link, Outlet} from "react-router-dom";
import NavigationBar from "@/components/navigationBar/NavigationBar.tsx";

export const PublicMobileLayout = () => {
    return (
        <div className="bg-mobile-custom flex flex-col min-h-screen ">
            <header className="text-black p-4">
                <NavigationBar />
            </header>

            <div className="flex flex-1">

                <main className="flex-1 p-4">
                    <Outlet />
                </main>

            </div>

            <footer className="mt-8 border-t py-4 text-center text-sm text-teal-300 ">
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
                <p className={"text-teal-300"}>© 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.</p>
            </footer>
        </div>
    );
};
