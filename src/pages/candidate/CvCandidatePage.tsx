import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";

const cvList = [
    { id: 1, title: "CV PROF DE FRANÇAIS", image: "/path/to/cv-preview1.png" },
    { id: 2, title: "CV FORMATEUR", image: "/path/to/cv-preview2.png" },
    { id: 3, title: "CV ENSEIGNANT", image: "/path/to/cv-preview3.png" }
];

export const CvCandidatePage = () => {
    const navigate = useNavigate();
    const [selectedCv, setSelectedCv] = useState(null);

    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-teal-300 to-blue-500 min-h-screen p-6">
            <h1 className="text-xl font-semibold text-center text-blue-900">ENVOYER VOTRE CANDIDATURE</h1>
            <p className="text-sm text-blue-800">CHOISISSEZ VOTRE CV</p>
            <div className="mt-6 w-full max-w-md space-y-4">
                {cvList.map((cv) => (
                    <Card key={cv.id} className={`relative p-4 bg-white shadow-md rounded-2xl ${selectedCv === cv.id ? 'border-2 border-blue-500' : ''}`}>
                        <CardContent className="flex flex-col items-center">
                            <img src={cv.image} alt="CV Preview" className="w-3/4 rounded-lg" />
                            <div className="flex items-center justify-center w-full mt-4 gap-4">
                                <button onClick={() => setSelectedCv(cv.id)} className={`w-6 h-6 rounded-full p-1 border ${selectedCv === cv.id ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                    {selectedCv === cv.id && <Check className="w-full h-full" />}
                                </button>
                                <p className="text-lg font-medium text-gray-700 text-center">{cv.title}</p>
                                <Edit2 className="text-gray-500 w-6 h-6 cursor-pointer" onClick={() => navigate('/cv-build')} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-6 w-full max-w-md flex justify-between">
                <Button variant="outline" className="px-6 py-2">
                    <Link to="/offers-of-employer" className="text-black">RETOUR</Link>
                </Button>
                <Button className="px-6 py-2 bg-black text-white flex items-center" disabled={!selectedCv}>
                    <Link to="/next-step" className={`text-white flex items-center ${!selectedCv ? 'opacity-50 cursor-not-allowed' : ''}`}>CONTINUER <span className="ml-2">➡️</span></Link>
                </Button>
            </div>
        </div>
    );
};
