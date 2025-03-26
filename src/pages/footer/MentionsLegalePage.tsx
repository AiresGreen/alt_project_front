import {BackButton} from "@/components/BackButton/BackButton.tsx";

export default function MentionsLegalesPage() {
    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>
            <p className="mb-4 text-sm">
                Les informations ci-dessous régissent l'utilisation du site BalanceTonJob.
            </p>
            <h2 className="text-xl font-semibold mb-2">Éditeur du Site</h2>
            <p className="mb-4 text-sm">
                BalanceTonJob est un projet open-source créé par JM &amp; Vladiou. Toute reproduction ou utilisation du contenu est
                soumise aux dispositions légales en vigueur.
            </p>
            <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
            <p className="mb-4 text-sm">
                Le site est hébergé par [Nom de l'hébergeur]. Pour toute question concernant l'hébergement, merci de contacter
                [email de l'hébergeur].
            </p>
            <h2 className="text-xl font-semibold mb-2">Propriété Intellectuelle</h2>
            <p className="text-sm">
                L'ensemble du contenu présent sur ce site est protégé par les lois relatives à la propriété intellectuelle. Toute
                utilisation non autorisée est strictement interdite.
            </p>
        </div>
    )
}
