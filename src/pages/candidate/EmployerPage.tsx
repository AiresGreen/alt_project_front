import {Card} from "@/components/ui/card.tsx";
import {FaGlobe, FaIndustry, FaLinkedin, FaMapMarkerAlt, FaUsers} from "react-icons/fa";
import {Button} from "@/components/ui/button.tsx";
import {HeartIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export const EmployerPage = () => {
    return (
        <div>
            <header>
                <h1 className="text-2xl font-bold mb-6">MES CANDIDATURES</h1>
            </header>
            <Card className=" p-4 mb-4 border rounded-2xl shadow-md">
                <h2 className="text-lg font-bold flex items-center gap-2">
                    🚀 EntrepriseTech – Innover, Connecter, Réussir
                </h2>
                <p className="flex items-center gap-2 text-gray-900">
                    <FaMapMarkerAlt/> Localisation : Paris, France
                </p>
                <p className="flex items-center gap-2 text-gray-900">
                    <FaUsers/> Taille : 200-500 employés
                </p>
                <p className="flex items-center gap-2 text-gray-900">
                    <FaIndustry/> Secteur : Technologie / Logiciels SaaS
                </p>
                <p className="flex items-center gap-2 text-gray-900">
                    <FaGlobe/> Site web : <a href="https://www.entreprisetech.com"
                                             className="text-black">www.entreprisetech.com</a>
                </p>
                <p className="flex items-center gap-2 text-gray-900">
                    <FaLinkedin/> LinkedIn : <a href="#"
                                                className="text-black">EntrepriseTech sur LinkedIn</a>
                </p>
                <div className="flex items-center gap-4 mt-4">
                    <Button variant={"ghost"}><HeartIcon className="text-red-600 cursor-pointer"/></Button>
                    <Button>
                        <Link to={"/offers-of-employer"}>ENVOYER MA CANDIDATURE</Link>
                    </Button>
                </div>
                <div className="mt-2 flex flex-col gap-2">
                    <Button>
                        <Link to={"/offers-of-employer"}>VOIR LES OFFRES</Link>
                    </Button>
                    <Button>
                        <Link to="/contact-list"> VOIR LISTE DES SALARIÉS </Link>
                    </Button>
                    <BackButton/>
                </div>
            </Card>
        </div>
    );
}