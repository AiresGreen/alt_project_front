import {TfiMenuAlt} from "react-icons/tfi";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import { CiSearch } from "react-icons/ci";



export function NavigationBar() {
    return (
        <div className={"flex items-center space-x-4"}>
        <img
        src="../../../public/logo.png"
        alt="BalanceTonJob"
        className="w-20 mr-4"
    />
        <Menubar className="flex items-center bg-white border-b border-gray-200 px-4 py-2 text-sm">
            {/* Logo toujours affiché */}


            {/* BARRE DE RECHERCHE (cachée sur mobile, visible à partir de md) */}
            <div className="hidden md:flex items-center space-x-2 w-1/2 mx-4">
                <Input
                    type="text"
                    placeholder="Rechercher un poste..."
                    className="w-full"
                />
                <Button variant="outline" className={"bg-white"}><CiSearch /></Button>
            </div>

            {/* Burger menu uniquement sur mobile */}
            <MenubarMenu>
                <MenubarTrigger className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 focus:outline-none data-[state=open]:bg-gray-100">
                    <TfiMenuAlt className="h-4 w-4" />
                    <span>Menu</span>
                </MenubarTrigger>
                <MenubarContent className="bg-white text-gray-700">
                    <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                        Accueil
                    </MenubarItem>
                    <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                        À propos
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                        Contact
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            {/* Menus réservés à la version desktop */}
            <div className="hidden md:flex space-x-4 ml-auto">
                <MenubarMenu>
                    <MenubarTrigger className=" px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 focus:outline-none">
                        Connexion
                    </MenubarTrigger>
                    <MenubarContent className="bg-white text-gray-700">
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Se connecter
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 focus:outline-none">
                        M’inscrire
                    </MenubarTrigger>
                    <MenubarContent className="bg-white text-gray-700">
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Créer un compte
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </div>
        </Menubar>
        </div>
    );
}