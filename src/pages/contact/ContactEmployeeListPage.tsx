import { useState } from "react"
import { useMediaQuery } from "react-responsive"

// Composants shadcn (adapter les chemins si besoin)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import {BackButton} from "@/components/BackButton/BackButton.tsx";

// Exemple de données mock
const teamMembers = [
    { id: 1, name: "Alice", role: "Développeuse" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Chef de projet" },
]

type Message = {
    id: number
    sender: string
    content: string
}

export default function ContactEmployeeListPage() {
    // État pour savoir quel membre est sélectionné
    const [selectedMember, setSelectedMember] = useState<number | null>(null)

    // État local pour simuler une conversation
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "Alice", content: "Bonjour, comment puis-je t’aider ?" },
        { id: 2, sender: "Moi", content: "Bonjour Alice, j’ai une question sur le projet." },
    ])

    // État pour le champ de texte
    const [newMessage, setNewMessage] = useState("")

    // Détecte si l’écran est “small” (mobile)
    const isMobile = useMediaQuery({ maxWidth: 640 })

    // Gestion de l’envoi d’un message
    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const newId = messages.length + 1
        const updatedMessages = [
            ...messages,
            { id: newId, sender: "Moi", content: newMessage },
        ]
        setMessages(updatedMessages)
        setNewMessage("")
    }

    // Affiche la liste des membres ou la conversation selon la sélection
    const renderContent = () => {
        // Sur mobile : si aucun membre n’est sélectionné, on affiche la liste
        if (isMobile && selectedMember === null) {
            return (
                <div className="flex flex-col gap-2">
                    {teamMembers.map((member) => (
                        <Card
                            key={member.id}
                            className="cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedMember(member.id)}
                        >
                            <CardHeader>
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )
        }

        // Conversation : si un membre est sélectionné (ou si on est sur desktop)
        return (
            <Card className="flex flex-col w-full h-full  p-4 text-black">
                <CardHeader className="flex items-center justify-between">
                    {isMobile && (
                        <BackButton/>
                    )}
                    {selectedMember
                        ? teamMembers.find((m) => m.id === selectedMember)?.name
                        : "Sélectionnez un membre"}
                </CardHeader>
                <CardContent className="flex-1 overflow-auto space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${
                                msg.sender === "Moi"
                                    ? "text-right"
                                    : "text-left"
                            }`}
                        >
                            <p
                                className={`inline-block px-3 py-2 rounded-lg ${
                                    msg.sender === "Moi"
                                        ? "bg-blue-100 text-blue-900"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                <span className="block font-bold">{msg.sender}</span>
                                {msg.content}
                            </p>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-center space-x-2">
                        <Input
                            placeholder="Votre message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>Envoyer</Button>
                        <BackButton/>
                    </div>
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className="w-full h-screen p-4">
            {/* Sur desktop : affichage en 2 colonnes */}
            {/* Sur mobile : affichage conditionnel géré par renderContent() */}
            {isMobile ? (
                <div className="w-full h-full">{renderContent()}</div>
            ) : (
                <div className="flex h-full gap-4">
                    {/* Liste des membres */}
                    <div className="w-1/3 border-r border-gray-300 pr-4 flex flex-col gap-2  p-4">
                        {teamMembers.map((member) => (
                            <Card
                                key={member.id}
                                className={`cursor-pointer hover:bg-gray-50 ${
                                    selectedMember === member.id ? "bg-gray-50" : ""
                                }`}
                                onClick={() => setSelectedMember(member.id)}
                            >
                                <CardHeader>
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-gray-900">{member.role}</p>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>

                    {/* Conversation */}
                    <div className="w-2/3">{renderContent()}</div>
                </div>
            )}
        </div>
    )
}
