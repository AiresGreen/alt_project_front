import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

export const ProfilePicturePage = () => {
    // Stocke l'ensemble des photos, initialisé avec une image par défaut
    const [photos, setPhotos] = useState<string[]>([
        "https://github.com/shadcn.png",
    ]);
    // Stocke temporairement la nouvelle image sélectionnée pour prévisualisation
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Supprime la dernière photo ajoutée (peut être ajusté selon vos besoins)
    const handleDelete = () => {
        if (photos.length > 0) {
            setPhotos(photos.slice(0, -1));
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            // Crée une URL temporaire pour la prévisualisation de la photo
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Confirme l'ajout de la nouvelle image dans le tableau
    const handleConfirm = () => {
        if (selectedImage) {
            setPhotos([...photos, selectedImage]);
            setSelectedImage(null);
            setFileName("");
        }
    };

    // Affiche la dernière photo comme avatar courant
    const currentPhoto = photos.length > 0 ? photos[photos.length - 1] : null;

    return (
        <div className="flex flex-col gap-12 bg-background/65 rounded-xl items-center p-4">
            <Avatar className="flex flex-col  gap-4 ">
                {currentPhoto ? (
                    <AvatarImage
                        className="rounded-full w-50"
                        src={currentPhoto}
                        alt="Photo du profil"
                    />
                ) : (
                    <AvatarFallback>Prénom NOM</AvatarFallback>
                )}
                {currentPhoto && <p className="m-auto">Prénom Nom</p>}
            </Avatar>
            {!currentPhoto && <p className="m-auto">Aucune photo !!</p>}
            <div className="flex flex-col gap-20 ">
                {currentPhoto && (
                    <Button variant="outline" onClick={handleDelete}>
                        Supprimer la photo
                    </Button>
                )}
                <Button variant="outline" onClick={handleButtonClick}>
                    {fileName
                        ? `Fichier sélectionné : ${fileName}`
                        : "Ajouter une photo"}
                </Button>

                {/* Input caché de manière accessible */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={handleFileChange}
                />

                {!fileName && (
                    <p className="text-gray-500">Aucun fichier sélectionné</p>
                )}

                {/* Bouton de confirmation visible uniquement lorsqu'une image est sélectionnée */}
                {selectedImage && (
                    <Button variant="outline" onClick={handleConfirm}>
                        Confirmer l'ajout
                    </Button>
                )}
                {/**Retour au profil */}

                <BackButton/>

                {/* Optionnel : Affichez une galerie de photos */}
                {photos.length > 0 && (
                    <div className="mt-4 flex gap-4">
                        {photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index}`}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
