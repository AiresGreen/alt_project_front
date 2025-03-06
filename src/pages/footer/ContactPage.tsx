"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = () => {
        // Ici vous pouvez ajouter l'intégration d'une API pour envoyer le formulaire
        alert("Votre demande a été envoyée !")
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Contact</h1>
            <p className="mb-4 text-sm">
                Pour toute demande, veuillez remplir le formulaire ci-dessous :
            </p>
            <div className="space-y-4">
                <Input
                    placeholder="Votre NOM"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full"
                />
                <Input
                    placeholder="Votre Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full"
                />
                <Input
                    type="email"
                    placeholder="Votre e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                />
                <textarea
                    placeholder="Votre message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={5}
                />
                <Button onClick={handleSubmit}>
                    Envoyer
                </Button>
            </div>
        </div>
    )
}
