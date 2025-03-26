import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export default function OffersOfEmployerPage() {
    const [selected, setSelected] = useState([false, false, false]);

    const toggleSelection = (index: number) => {
        const newSelection = [...selected];
        newSelection[index] = !newSelection[index];
        setSelected(newSelection);
    };

    return (
        <div className="flex flex-col items-center p-6 min-h-screen">
            <div className="w-full max-w-md">
                <h2 className="text-xl font-bold text-center text-blue-900">MES <span className="text-teal-700">CANDIDATURES</span></h2>
                <Card className="mt-4">
                    <CardContent className="p-4 space-y-2">
                        {[...Array(4)].map((_, index) => (
                            <div key={index}
                                 className="flex items-center border rounded p-2">
                                <Checkbox
                                    checked={selected[index]}
                                    onCheckedChange={() => toggleSelection(index)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-black">[Titre du poste] – CDI / CDD / Freelance – [Ville ou Remote]</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex justify-between mt-6">
                    <BackButton/>
                    <Link to={"/cv-candidate"}>
                        <Button>
                            CONTINUER <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}