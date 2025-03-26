import {useContext, useState, useEffect} from "react"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMediaQuery} from "react-responsive"
import {AuthContext} from "@/hook/contexts/auth.context"
import {useNavigate} from "react-router-dom"

// Composants ShadCN (adaptez selon votre arborescence)
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

// Icônes Lucide
import {Edit, Check, ArrowLeftCircle} from "lucide-react"
import ChangePasswordForm from "@/pages/personnalInfos/ChangePasswordForm.tsx";
import {BackButton} from "@/components/BackButton/BackButton.tsx";

// Schéma de validation avec Zod
const InfoSchema = z.object({
    nom: z.string().min(1, "Le nom est requis"),
    prenom: z.string().min(1, "Le prénom est requis"),
    linkedin: z.string().url("Lien LinkedIn invalide"),
    email: z.string().email("Email invalide"),
    telephone: z.string().optional(),
    motDePasse: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
})

type InfoType = z.infer<typeof InfoSchema>



export default function PersonalInfosList() {
    const {updateAuthentication} = useContext(AuthContext)
    const navigate = useNavigate()
    const isMobile = useMediaQuery({maxWidth: 768})

    // Vérifie l’authentification pour rediriger si nécessaire
    useEffect(() => {
        if (!updateAuthentication) {
            navigate("/login")
        }
    }, [updateAuthentication, navigate])

    // Si pas authentifié, on ne render pas la page
    if (!updateAuthentication) return null

    // Gestion du formulaire via react-hook-form
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<InfoType>({
        resolver: zodResolver(InfoSchema),
        defaultValues: {
            nom: "",
            prenom: "",
            linkedin: "",
            email: "",
            telephone: "",
            motDePasse: "",
        },
    })

    // État local
    const [info, setInfo] = useState<InfoType | null>(null)

    const [editMode, setEditMode] = useState(false)

    // Soumission du formulaire
    const onSubmit = (data: InfoType) => {
        setInfo(data)
        setEditMode(false)
    }

    // Clic sur “Modifier”
    const handleModify = () => {
        if (info) {
            reset(info) // pré-remplit avec l’info existante
        }
        setEditMode(true)
    }


    // Exemple de bouton “Retour au profil” ou “Mon profil”
    const handleGoToProfile = () => {
        // Exemple : renvoie vers la page de profil
        navigate("/mon-profil")
    }



    return (
        <div className="flex flex-col items-center p-4 space-y-6">
            {/* Barre de titre + bouton pour aller au profil */}
            <div className="flex w-full max-w-md justify-between items-center">
                <Button
                    variant="ghost"
                    className="flex items-center gap-1"
                    onClick={handleGoToProfile}
                >
                    <ArrowLeftCircle className="w-5 h-5"/>
                    <span>Mon Profil</span>
                </Button>
                <BackButton/>
                <h1 className="text-xl font-bold">
                    {isMobile ? "Infos Perso (Mobile)" : "Infos Personnelles"}
                </h1>
                <div className="w-10"/>
            </div>

            {/* Affichage des infos quand pas en édition */}
            {!editMode && (
                <>
                    {info ? (
                        <div className="w-full max-w-md space-y-2 bg-card-custom shadow">
                            <p><strong>Nom :</strong> {info.nom}</p>
                            <p><strong>Prénom :</strong> {info.prenom}</p>
                            <p>
                                <strong>LinkedIn :</strong>{" "}
                                <a href={info.linkedin}
                                   className="text-blue-600 underline"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    {info.linkedin}
                                </a>
                            </p>
                            <p><strong>Email :</strong> {info.email}</p>
                            <p><strong>Téléphone :</strong> {info.telephone}</p>
                            <p><strong>Mot de passe :</strong> ********</p>
                        </div>
                    ) : (
                        <p className="text-gray-500">Aucune information enregistrée. Veuillez ajouter des infos.</p>
                    )}

                    {/* Boutons en bas */}
                    <div className="flex gap-4">
                        <Button onClick={handleModify}
                                className="flex items-center gap-2">
                            <Edit className="w-4 h-4"/>
                            Modifier
                        </Button>
                    </div>
                </>
            )}

            {/* Formulaire si on est en édition */}
            {editMode && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-md space-y-4 p-6 rounded-xl bg-card-custom shadow"
                >
                    <div>
                        <Label htmlFor="nom">Nom</Label>
                        <Input id="nom" placeholder="Entrez votre nom" {...register("nom")} />
                        {errors.nom && <p className="text-red-500">{errors.nom.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input id="prenom" placeholder="Entrez votre prénom" {...register("prenom")} />
                        {errors.prenom && <p className="text-red-500">{errors.prenom.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="linkedin">Profil LinkedIn</Label>
                        <Input
                            id="linkedin"
                            placeholder="https://www.linkedin.com/in/votre-profil"
                            {...register("linkedin")}
                        />
                        {errors.linkedin && <p className="text-red-500">{errors.linkedin.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="exemple@email.com"
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <section className="mt-8">
                            <h2 className="text-lg font-semibold mb-4">Modifier mon mot de passe</h2>
                            <ChangePasswordForm />
                        </section>
                    </div>

                    <div>
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input
                            id="telephone"
                            placeholder="Votre numéro"
                            {...register("telephone")}
                        />
                        {errors.telephone && (
                            <p className="text-red-500">{errors.telephone.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="mt-2 flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Enregistrer
                    </Button>
                </form>
            )}


        </div>
    )
}

