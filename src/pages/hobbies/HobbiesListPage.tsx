import { useState} from 'react'
import {useForm} from 'react-hook-form'
import {Toaster, toast} from 'sonner'
import {Hobby} from "@/interface/HobbyInterface.tsx";

/**
 * LoisirsPage
 * -----------
 * - Affiche la liste des hobbies (mode "list").
 * - Permet l'ajout d'un hobby (mode "add").
 * - Permet la modification d'un hobby existant (mode "edit").
 * - Gère l'affichage d'un toast pour confirmer les actions.
 */
export default function HobbiesListPage() {
    // Exemple de structure de données pour les loisirs (on stocke en local state)
    const [hobbies, setHobbies] = useState<Hobby[]>([
        // Vous pouvez initialiser avec quelques données factices
        {id: 1, title: 'Jouer', since: '2021', conclusion: 'Très fun'},
        {id: 2, title: 'Manger', since: '2019', conclusion: 'Très bon'},
    ])

    // Hobby actuellement sélectionné pour la modification
    const [currentHobby, setCurrentHobby] = useState(null)

    // "list" | "add" | "edit"
    const [mode, setMode] = useState('list')

    // Hook form
    const {register, handleSubmit, reset} = useForm()

    /**
     * Soumission du formulaire (pour ajouter ou éditer)
     */
    const onSubmit = (data: any) => {
        if (mode === 'add') {
            // Ajout d'un nouveau hobby
            const newHobby = {
                id: Date.now(), // id fictif
                ...data,
            }
            setHobbies([...hobbies, newHobby])
            toast.success('Loisir ajouté avec succès !')
        } else if (mode === 'edit' && currentHobby) {
            // Édition d’un hobby existant
            setHobbies(
                hobbies.map((h :{id:number}) =>
                    h.id === currentHobby.id
                        ? {...h, ...data} // On met à jour les champs
                        : h
                )
            )
            toast.success('Loisir modifié avec succès !')
        }

        // Après la soumission, on repasse en mode "list" et on reset le formulaire
        reset()
        setMode('list')
        setCurrentHobby(null)
    }

    /**
     * Affiche le formulaire d'ajout
     */
    const handleAddNew = () => {
        reset()
        setCurrentHobby(null)
        setMode('add')
    }

    /**
     * Affiche le formulaire d'édition avec les valeurs d'un hobby
     */
    const handleEdit = (hobby: any) => {
        setCurrentHobby(hobby)
        reset(hobby) // Pré-remplit le formulaire avec les données existantes
        setMode('edit')
    }

    /**
     * Supprime un hobby
     */
    const handleDelete = (id: number) => {
        setHobbies(hobbies.filter((h) => h.id !== id))
        toast.success('Loisir supprimé avec succès !')
    }

    /**
     * Annuler l'ajout ou l'édition, retour à la liste
     */
    const handleCancel = () => {
        reset()
        setCurrentHobby(null)
        setMode('list')
    }

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Composant pour les toasts */}
            <Toaster position="top-right" />

            <h1 className="text-2xl font-bold mb-4">Loisirs</h1>

            {mode === 'list' && (
                <div>
                    {/* Bouton pour créer un nouveau loisir */}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={handleAddNew}
                    >
                        Nouveau
                    </button>

                    {/* Liste des hobbies existants */}
                    {hobbies.length === 0 ? (
                        <p>Aucun loisir pour le moment.</p>
                    ) : (
                        <ul className="space-y-2 bg-card-custom">
                            {hobbies.map((hobby) => (
                                <li
                                    key={hobby.id}
                                    className="flex items-center justify-between border p-2 rounded"
                                >
                                    <div>
                                        <div className="font-semibold">{hobby.title}</div>
                                        <div className="text-sm text-gray-700">
                                            Depuis : {hobby.since}
                                        </div>
                                        <div className="text-sm text-gray-800">
                                            {hobby.conclusion}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEdit(hobby)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleDelete(hobby.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Exemple d'autre bouton : "Retour au passé" */}
                    <button
                        onClick={() => alert('Retour au passé')}
                        className="mt-4 bg-gray-300 px-4 py-2 rounded"
                    >
                        Retour au passé
                    </button>
                </div>
            )}

            {/* Formulaire (ajout ou édition) */}
            {(mode === 'add' || mode === 'edit') && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card-custom p-4 ">
                    <div>
                        <label className="block font-semibold">Vite Hobby</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            className="border w-full p-2 rounded"
                            placeholder="Ex : Jouer, Lire..."
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Depuis quand ?</label>
                        <input
                            type="text"
                            {...register('since')}
                            className="border w-full p-2 rounded"
                            placeholder="Ex : 2021"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Et quoi en conclure ?</label>
                        <textarea
                            {...register('conclusion')}
                            className="border w-full p-2 rounded"
                            rows={3}
                            placeholder="Ex : C'est super !"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {mode === 'add' ? 'Ajouter' : 'Enregistrer'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
