import {Link, useNavigate, useLocation} from "react-router-dom";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    User,
    LogOut,
    Heart,
    Edit,
    Book,
    Menu,
    Search,
} from "lucide-react";
import {useMediaQuery} from "react-responsive";
import {useContext} from "react";
import {AuthContext} from "@/hook/contexts/auth.context";

export default function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktop = useMediaQuery({minWidth: 768});
    const {isAuthenticated, userProfile} = useContext(AuthContext);

    const handleLogout = () => {
        // Logique de déconnexion ici
        navigate("/");
    };

    return (
        <div className="w-full px-4 py-3 flex items-center justify-between bg-transparent">
            <Link to={"/"}>
                <img src="/logo.png"
                     alt="BalanceTonJob"
                     className="max-h-30"/>
            </Link>

            {/*
        --------------------------------------------
        DESKTOP UNIQUEMENT : Liens + barre de recherche
        --------------------------------------------
        On affiche ce bloc UNIQUEMENT si :
          1) on est en mode desktop (isDesktop === true)
          2) on est sur la page d’accueil (location.pathname === "/")
      */}
            <div className={"flex flex-col items-center gap-4"}>
            {isDesktop && (
                <div className="flex flex-col items-center gap-4">
                    {/* Liens de navigation au centre */}
                    <div className="flex items-center gap-8">
                        <Link to="/cv-build"
                              className="text-black hover:underline">
                            Construire mon CV
                        </Link>
                        <Link to="/candidate-page"
                              className="text-black hover:underline">
                            Mes candidatures
                        </Link>
                        <Link to="/contact-list"
                              className="text-black hover:underline">
                            Mon carnet des contacts
                        </Link>
                    </div>
                </div>
            )}

            {isDesktop && location.pathname === "/" && (
                <div className="flex flex-col items-center gap-4">
                    {/* Liens de navigation au centre */}
                    {/* Barre de recherche */}
                    <div className="flex items-center gap-8">
                        <Input
                            type="search"
                            placeholder="Rechercher un poste..."
                            className="flex-grow border-black bg-white"
                        />
                        <Button variant="outline"
                                size="icon">
                            <Search className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>
            )}
            </div>

            <Menubar>
                {/*
          --------------------------------------------
          VERSION MOBILE : Menu hamburger
          (Aucun lien ni barre de recherche en mobile)
          --------------------------------------------
        */}
                {!isDesktop && (
                    <MenubarMenu>
                        <MenubarTrigger className="flex items-center gap-2 px-3 py-2">
                            <Menu className="h-6 w-6"/>
                        </MenubarTrigger>
                        <MenubarContent>
                            {!isAuthenticated ? (
                                <>
                                    <MenubarItem onClick={() => navigate("/login")}>
                                        Connexion
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/signin")}>
                                        M’inscrire
                                    </MenubarItem>
                                </>
                            ) : (
                                <>
                                    <MenubarItem onClick={() => navigate("/profile-page")}>
                                        <User className="h-4 w-4 mr-2"/>
                                        Profil
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/cv")}>
                                        <Edit className="h-4 w-4 mr-2"/>
                                        Mes CV
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/favorite")}>
                                        <Heart className="h-4 w-4 mr-2"/>
                                        Favoris
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/recommandations")}>
                                        <Book className="h-4 w-4 mr-2"/>
                                        Recommandations
                                    </MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem onClick={() => navigate("/candidate-page")}>
                                        Mes candidatures
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/contact-list")}>
                                        Mon carnet des contacts
                                    </MenubarItem>
                                    <MenubarItem onClick={() => navigate("/questionner")}>
                                        QCM-construct
                                    </MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem onClick={handleLogout}>
                                        <LogOut className="h-4 w-4 mr-2"/>
                                        Déconnexion
                                    </MenubarItem>
                                </>
                            )}
                            <MenubarSeparator/>
                            <MenubarItem onClick={() => navigate("/mentions-legales")}>
                                Mentions légales
                            </MenubarItem>
                            <MenubarItem onClick={() => navigate("/contact")}>
                                Contact
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                )}

                {/*
          --------------------------------------------
          VERSION DESKTOP : Boutons de connexion / Avatar
          --------------------------------------------
        */}
                {isDesktop && !isAuthenticated && (
                    <div className="flex gap-3">
                        <Button variant="ghost"
                                onClick={() => navigate("/login")}>
                            Connexion
                        </Button>
                        <Button onClick={() => navigate("/signin")}>M’inscrire</Button>
                    </div>
                )}

                {isDesktop && isAuthenticated && (
                    <MenubarMenu>
                        <MenubarTrigger className="flex flex-col">
                            <Avatar>
                                <AvatarImage
                                    src={userProfile?.avatarUrl || "https://github.com/shadcn.png"}
                                    alt="Profil"
                                />
                                <AvatarFallback>{userProfile?.initials || "BTJ"}</AvatarFallback>
                            </Avatar>
                            <p className="text-black">{userProfile?.initials || "BTJ"}</p>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={() => navigate("/profile-page")}>
                                <User className="h-4 w-4 mr-2"/>
                                Voir mon profil
                            </MenubarItem>
                            <MenubarItem onClick={() => navigate("/cv")}>
                                <Edit className="h-4 w-4 mr-2"/>
                                Voir mes CV
                            </MenubarItem>
                            <MenubarItem onClick={() => navigate("/favorite")}>
                                <Heart className="h-4 w-4 mr-2"/>
                                Offres favorites
                            </MenubarItem>
                            <MenubarItem onClick={() => navigate("/recommandations")}>
                                <Book className="h-4 w-4 mr-2"/>
                                Recommandations
                            </MenubarItem>
                            <MenubarSeparator/>
                            <MenubarItem onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2"/>
                                Déconnexion
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                )}
            </Menubar>
        </div>
    );
}
