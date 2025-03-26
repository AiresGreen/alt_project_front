import {BackButton} from "@/components/BackButton/BackButton.tsx";

export default function AproposPage() {
    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-2xl font-bold mb-4">À propos de BalanceTonJob</h1>
            <p className="mb-4 text-sm">
                BalanceTonJob est une plateforme dédiée à la recherche d'emploi qui connecte les candidats aux meilleures offres du marché.
                Notre objectif est de simplifier la recherche et de rendre le processus plus accessible et intuitif.
            </p>
            <h2 className="text-xl font-semibold mb-2">Notre Mission</h2>
            <p className="mb-4 text-sm">
                Faciliter la rencontre entre les talents et les entreprises grâce à une interface moderne et ergonomique, tout en
                mettant à disposition des outils performants pour optimiser le parcours de recrutement.
            </p>
            <h2 className="text-xl font-semibold mb-2">Pourquoi BalanceTonJob ?</h2>
            <p className="text-sm">
                Dans un marché en constante évolution, BalanceTonJob se démarque par sa simplicité d'utilisation, sa rapidité et
                son approche innovante qui permet à chacun de trouver rapidement l'opportunité qui lui correspond.
            </p>
        </div>
    )
}