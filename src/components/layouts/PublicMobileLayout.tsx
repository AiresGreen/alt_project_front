import {Link, Outlet} from "react-router-dom";
import { NavigationBarNonInscrit } from "@/components/navigationBar/NavigationBar.tsx";

export const PublicMobileLayout = () => {
    return (
        <div>
            <header>
                <NavigationBarNonInscrit />
            </header>

            <main >
                <Outlet />
            </main>

            <footer >
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
