import { useState} from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Edit2, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { GrSend } from "react-icons/gr";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

const cvList: ({ id: any; title: string; image: string })[] = [
    { id: 1, title: "CV PROF DE FRANÇAIS", image: "/path/to/cv-preview1.png" },
    { id: 2, title: "CV FORMATEUR", image: "/path/to/cv-preview2.png" },
    { id: 3, title: "CV ENSEIGNANT", image: "/path/to/cv-preview3.png" }
];

export const CvCandidatePage = () => {
    const navigate = useNavigate();
    const [selectedCv, setSelectedCv] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = () => {
        if (!selectedCv) {
            setErrorMessage("Veuillez sélectionner un CV avant de continuer.");
            return;
        }
        setErrorMessage("");
        setSubmissionSuccess(true);
        setTimeout(() => navigate("/home-inscrit"), 3000);
    };

    return (
        <div className="flex flex-col items-center  min-h-screen p-6">
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
                                <Edit2 className="text-gray-500 w-6 h-6 cursor-pointer" onClick={() => navigate('/cv-builder')} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            <div className="mt-6 w-full max-w-md flex justify-between gap-2">
                <BackButton/>
                <Button variant="outline" className="px-6 py-2">
                    <Link to="/cv-build" className="text-black">
                    CRÉER UN NOUVEAU CV
                    </Link>
                </Button>
                <Button className="px-6 py-2 bg-black text-white flex items-center" onClick={handleSubmit}>
                    POSTULER <span className="ml-2"><GrSend /></span>
                </Button>
            </div>
            {submissionSuccess && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                        <p className="text-lg font-bold">Votre candidature a été envoyée.</p>
                        <p className="text-sm text-gray-600">Suivre le progrès vous pouvez</p>
                        <Link to="/applications" className="text-blue-500 flex items-center justify-center mt-2">
                            <LinkIcon className="w-5 h-5 mr-1" /> ici
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
