import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import {BackButton} from "@/components/BackButton/BackButton.tsx";



export default function MyCvPage() {
    // Exemple d'un tableau de CV
    const cvList = [
        { id: 1, title: "CV 1" },
        { id: 2, title: "CV 2" },
        { id: 3, title: "CV 3" },
        { id: 4, title: "CV 4" },
        { id: 5, title: "CV 5" },
        { id: 6, title: "CV 6" },
    ]

    return (
        <section>
            <h1 className="text-2xl font-bold mb-6">Mes CV</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {cvList.map((cv) => (
                    <Card key={cv.id} className="shadow hover:shadow-lg transition">
                        <CardHeader>
                            <CardTitle>{cv.title}</CardTitle>
                            <BackButton/>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                                Aperçu du CV
                            </div>
                            <p className="mt-2 text-sm text-gray-700">CV PROB DE FRANÇAIS</p>
                            <Link to={"/cv-builder"}>
                                <Button className="flex items-center gap-2 font-bold py-2 px-4 rounded transition">
                                    <FaRegEdit />
                                    Modifier
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
