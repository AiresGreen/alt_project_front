import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UsefulInfosList: React.FC = () => {
    // État contenant la liste des infos utiles
    const [infos, setInfos] = useState<string[]>([
        'Marié',
        '2 enfants',
        'Permis B',
        'Véhicule personnel',
        'Possibilité de télétravail',
        'Handicap (RQTH)',
        'Bilingue français-anglais',
    ]);

    // État pour la nouvelle info saisie
    const [newInfo, setNewInfo] = useState<string>('');
    const navigate = useNavigate();

    // Ajout d'une nouvelle info
    const handleAddInfo = () => {
        if (newInfo.trim() !== '') {
            setInfos([...infos, newInfo.trim()]);
            setNewInfo('');
        }
    };

    // Suppression d'une info de la liste
    const handleDeleteInfo = (index: number) => {
        setInfos(infos.filter((_, i) => i !== index));
    };

    // Gestion de la touche "Entrée" dans le champ de saisie
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddInfo();
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* En-tête */}
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Infos Zutiles</h1>
                <p className="text-gray-700 mt-2">
                    Ici, vous pouvez ajouter des informations personnelles et pratiques qui pourraient être utiles aux recruteurs ou faciliter votre recherche d’emploi.
                </p>
            </header>

            {/* Liste des infos */}
            <div className="bg-white shadow rounded p-4 bg-card-custom">
                {infos.map((info, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center border-b last:border-b-0 py-2"
                    >
                        <span>{info}</span>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteInfo(index)}
                        >
                            X
                        </button>
                    </div>
                ))}

                {/* Zone d'ajout d'une nouvelle info */}
                <div className="mt-4 flex">
                    <input
                        type="text"
                        value={newInfo}
                        onChange={(e) => setNewInfo(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Saisissez ici une information pertinente..."
                        className="flex-1 border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddInfo}
                        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            {/* Bouton de retour */}
            <div className="mt-4">
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Retour au profil
                </button>
            </div>

            {/* Mentions sur la confidentialité */}
            <footer className="mt-8 text-xs text-gray-500">
                <p className={"bg-gray-500 rounded-lg p-2"}>
                    Les informations saisies ici sont facultatives et servent uniquement à vous aider dans votre recherche d’emploi. Vous restez libre de choisir quelles informations partager avec les recruteurs. Pour en savoir plus sur la gestion de vos données, consultez notre{' '}
                    <a href="/politique-confidentialite" className="text-blue-500 underline">
                        Politique de confidentialité
                    </a>.
                </p>
            </footer>
        </div>
    );
};

