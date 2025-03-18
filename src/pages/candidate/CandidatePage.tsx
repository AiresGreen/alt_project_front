import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {Link} from "react-router-dom";

export const CandidatePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-6">
            <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <h1 className="text-xl font-bold text-teal-700">MES CANDIDATURES</h1>
                    <CardContent className="flex flex-col gap-4 mt-4">
                        <Button className="w-full bg-black text-white">
                            <Link to={"/employer-page"}> VOIR LA LISTE DES EMPLOYEURS</Link>
                        </Button>
                        <Button className="w-full bg-white border border-gray-300 text-black">
                            <Link to={"src/pages/folow/FolowApplicationPage.tsx"}>VOIR MES CANDIDATURES</Link>
                        </Button>
                        <Button className="w-full bg-white border border-gray-300 text-black">
                            <Link to={"/home-inscrit"}> RETOUR </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}