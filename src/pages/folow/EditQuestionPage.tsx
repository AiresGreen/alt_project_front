import * as React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function EditQuestionPage() {
    // Ici, on démarre avec une valeur vide (pas de texte par défaut).
    const [message, setMessage] = React.useState("")


    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
            <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-md">
                <h1 className="text-xl font-bold mb-4">Écrivez votre message</h1>

                <textarea
                    className="
            w-full h-56
            border border-gray-300 rounded-md
            p-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
                    // Le placeholder affiche le texte exemple multi-lignes
                    placeholder={`Bonjour [Nom du recruteur],

Tout d'abord, merci d’avoir pris le temps d’examiner ma candidature pour le poste de [nom du poste] au sein de [nom de l’entreprise]. 
Même si ma candidature n’a pas été retenue, j’aimerais beaucoup améliorer mes futures démarches et mieux comprendre ce qui n’a pas marché. 
Auriez-vous un peu de temps pour me donner votre retour ? 

Selon vous, quels sont les principaux points que je devrais améliorer pour mieux correspondre à ce type de poste ?`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className="flex justify-center space-x-2">
                    <Button type="submit" variant="default">
                        <Link to="/edit-questionner">
                            ENVOYER
                        </Link>
                    </Button>
                    <Button variant="outline" className="text-black">
                        <Link to="/applications">
                            RETOUR
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
