import { Outlet} from "react-router-dom";
import NavigationBar from "@/components/navigationBar/NavigationBar.tsx";
import FooterBar from "@/components/footerBar/FooterBar.tsx";

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

            <footer className="mt-8 border-t py-4 text-center text-sm text-black ">
                <FooterBar/>
            </footer>
        </div>
    );
};
