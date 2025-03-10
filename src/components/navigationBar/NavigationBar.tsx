import {RxAvatar} from "react-icons/rx";
import {User, Search, Heart, LogOut, Edit, Book} from "lucide-react"
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator, MenubarShortcut,
} from "@/components/ui/menubar";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button.tsx";
import {CiSearch} from "react-icons/ci";
import {TfiMenuAlt} from "react-icons/tfi";
import {Avatar, AvatarFallback,} from "@radix-ui/react-avatar";


/*______________________________________________________*/
/*BARRE DE NAVIGATION POUR LA PAGE D4ACCUEIL NON-INSCRIT*/

/*______________________________________________________*/

export function NavigationBarNonInscrit() {
    return (

        <div className={"flex items-center content-between space-x-4"}>
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
                    <Button variant="outline"
                            className={"bg-white"}><CiSearch/></Button>
                </div>

                {/* Burger menu uniquement sur mobile */}
                <MenubarMenu>
                    <MenubarTrigger className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 focus:outline-none data-[state=open]:bg-gray-100">
                        <TfiMenuAlt className="h-4 w-4"/>
                        <span>Menu</span>
                    </MenubarTrigger>
                    <MenubarContent className="bg-white text-gray-700">
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Accueil
                        </MenubarItem>
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            À propos
                        </MenubarItem>
                        <MenubarSeparator/>
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

/*______________________________________________________*/
/*AVATAR*/

/*______________________________________________________*/

export function PhotoDeProfil() {
    return (
        <Avatar className={"flex flex-col items-center justify-center"}>
            <RxAvatar/>
            <AvatarFallback>JM FM</AvatarFallback>
        </Avatar>
    )
}

/*______________________________________________________*/
/*BARRE DE NAVIGATION POUR LA PAGE D'ACCUEIL INSCRIT*/

/*______________________________________________________*/

export function NavigationBarInscrit() {

    return (
        <div className="w-full bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            {/* LOGO */}
            <img
                src="../../../public/logo.png"
                alt="BalanceTonJob"
                className="w-20 h-auto"
            />

            {/* MENUBAR GLOBAL */}
            <Menubar className="flex items-center justify-end w-full md:ml-4">
                {/* --- MENU BURGER (MOBILE) */}
                <MenubarMenu>
                    <MenubarTrigger className="md:hidden flex items-center gap-2 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-100 focus:outline-none">
                        <PhotoDeProfil/>
                    </MenubarTrigger>

                    <MenubarContent className="bg-white text-gray-700">
                        {/* Liste issue */}
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <User className="w-4 h-4"/>
                            Voir mon profil
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <Search className="w-4 h-4"/>
                            Rechercher
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <Edit className="w-4 h-4"/>
                            Voir mes CV
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <Heart className="w-4 h-4"/>
                            Mes offres favorites
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <Book className="w-4 h-4"/>
                            Mes recommandations
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Construire mon CV
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Mes candidatures
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Mon carnet des contacts
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Messagerie
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            QCM-construct
                        </MenubarItem>

                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100 flex items-center gap-2">
                            <LogOut className="w-4 h-4"/>
                            Déconnexion
                        </MenubarItem>

                        <MenubarSeparator/>
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            À propos
                        </MenubarItem>
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Contact
                        </MenubarItem>
                        <MenubarItem className="px-3 py-1.5 hover:bg-gray-100 focus:bg-gray-100">
                            Mentions légales
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                {/* --- LIENS DE NAVIGATION (DESKTOP)--- */}
                    <MenubarMenu>
                        <MenubarTrigger className="hidden md:flex ml-auto space-x-2">
                            {/* AVATAR + NOM */}
                            <div>
                                <PhotoDeProfil/>
                                <span className="hidden md:text-sm font-semibold">Prénom NOM</span>
                            </div>
                        </MenubarTrigger>
                        <MenubarContent className={"bg-gray-300"}>
                            {/* “Voir/modifier profil” */}
                            <MenubarItem>
                                <span className="cursor-pointer hover:underline flex items-center gap-2">
                                    Voir/modifier profil
                                </span>
                                <MenubarShortcut><User className="w-4 h-4"/></MenubarShortcut>

                            </MenubarItem>
                            {/* “Voir mes CV” */}
                            <MenubarItem>
                                <span className="cursor-pointer hover:underline flex items-center gap-2">
                                    Voir mes CV
                                </span>
                                <MenubarShortcut><Edit className="w-4 h-4"/></MenubarShortcut>

                            </MenubarItem>
                            {/* “Mes offres favorites” */}
                            <MenubarItem>
                                <span className="cursor-pointer hover:underline flex items-center gap-2">
                                    Mes offres favorites
                                </span>
                                <MenubarShortcut><Heart className="w-4 h-4"/></MenubarShortcut>
                            </MenubarItem>
                            {/* “Mes recommandations” */}
                            <MenubarItem>
                                <span className="cursor-pointer hover:underline flex items-center gap-2">
                                    Mes recommandations
                                </span>
                                <MenubarShortcut><Book className="w-4 h-4"/></MenubarShortcut>
                            </MenubarItem>
                            {/* “Déconnexion” */}
                            <MenubarItem>
                                <span className="cursor-pointer hover:underline flex items-center gap-2">
                                    Déconnexion
                                </span>
                                <MenubarShortcut><LogOut className="w-4 h-4"/></MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
            </Menubar>
        </div>
    )
}