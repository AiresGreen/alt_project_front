import { Outlet} from "react-router-dom";
import NavigationBar from "@/components/navigationBar/NavigationBar.tsx";
import FooterBar from "@/components/footerBar/FooterBar.tsx";


export const PrivateMobileLayout = () => {
    return (
        <div className="bg-mobile-custom flex flex-col min-h-screen">
            <header className="">
                <NavigationBar />
            </header>

            <main className="flex-1 p-2">
                <Outlet />
            </main>

            <footer className="mt-8 border-t py-4 text-center text-sm text-black ">
                <FooterBar/>
            </footer>
        </div>
    );
};
