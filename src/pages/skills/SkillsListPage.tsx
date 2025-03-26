import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

// Interfaces & Types
import { SkillInterface } from '@/interface/SkillInterface'

// Composants shadcn/ui
import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Import de sonner pour les toasts
import { toast } from 'sonner'

// Définition du "mode" de la page
type PageMode = 'list' | 'create' | 'edit'

// Form values pour react-hook-form
interface SkillFormValues {
    title: string
    context: string
}

export const SkillsListPage: React.FC = () => {
    const navigate = useNavigate()

    // État local pour la liste des compétences
    const [skills, setSkills] = useState<SkillInterface[]>([
        {
            id: 1,
            title: 'Développer HTML/CSS',
            context: 'Incubateur AI, CapGemini, Facebook',
        },
        {
            id: 2,
            title: 'Coder JS',
            context: 'Incubateur AI, CapGemini, Facebook',
        },
        {
            id: 3,
            title: "WireFramer l'application du Turfu",
            context: 'Incubateur AI, CapGemini, Facebook',
        },
        {
            id: 4,
            title: 'Traire une chèvre',
            context: 'Ferme du Petit Bois, Zoo de Vincennes',
        },
    ])

    // État local pour savoir si on est en mode LIST, CREATE ou EDIT
    const [mode, setMode] = useState<PageMode>('list')

    // Stocke la compétence qu’on édite (si mode = edit)
    const [editingSkill, setEditingSkill] = useState<SkillInterface | null>(null)

    // Configuration du form react-hook-form
    const form = useForm<SkillFormValues>({
        defaultValues: {
            title: '',
            context: '',
        },
    })

    const { handleSubmit, reset } = form

    // Quand on passe en mode edit, on met à jour le formulaire
    useEffect(() => {
        if (mode === 'edit' && editingSkill) {
            reset({
                title: editingSkill.title,
                context: editingSkill.context,
            })
        }
        if (mode === 'create') {
            reset({ title: '', context: '' })
        }
    }, [mode, editingSkill, reset])

    /**
     * Actions
     */

        // 1. Cliquer sur "Nouveau"
    const handleNewSkill = () => {
            setMode('create')
            setEditingSkill(null)
        }

    // 2. Soumission du formulaire (ajout ou édition)
    const onSubmitForm = (data: SkillFormValues) => {
        if (mode === 'create') {
            // Création d’une nouvelle compétence
            const newId = Math.max(...skills.map((s) => s.id)) + 1
            const newSkill: SkillInterface = {
                id: newId,
                title: data.title,
                context: data.context,
            }
            setSkills((prev) => [...prev, newSkill])
            toast.success('Compétence ajoutée avec succès.')
        }

        if (mode === 'edit' && editingSkill) {
            // Modification de la compétence
            setSkills((prev) =>
                prev.map((s) =>
                    s.id === editingSkill.id
                        ? { ...s, title: data.title, context: data.context }
                        : s
                )
            )
            toast.success('Compétence modifiée avec succès.')
        }

        // On revient à la liste
        setMode('list')
        setEditingSkill(null)
    }

    // 3. Cliquer sur "Modifier" dans la liste
    const handleEditSkill = (skillId: number) => {
        const skillToEdit = skills.find((s) => s.id === skillId)
        if (!skillToEdit) return
        setEditingSkill(skillToEdit)
        setMode('edit')
    }

    // 4. Cliquer sur "Supprimer" dans la liste
    const handleDeleteSkill = (skillId: number) => {
        setSkills((prev) => prev.filter((skill) => skill.id !== skillId))
        toast.error('Compétence supprimée.')
    }

    // 5. Cliquer sur "Retour" (depuis la création/édition) ou "Retour au profil" (depuis la liste)
    const handleGoBack = () => {
        // Si on est en mode liste -> on part au profil
        if (mode === 'list') {
            navigate('/profile')
        } else {
            // Sinon, on repasse en mode liste
            setMode('list')
            setEditingSkill(null)
        }
    }

    /**
     * Rendu de la liste
     */
    const renderList = () => {
        return (
            <>
                <ul className="space-y-4 bg-card-custom">
                    {skills.map((skill) => (
                        <li
                            key={skill.id}
                            className="flex items-center justify-between border-b border-black pb-2"
                        >
                            <div>
                                <div className="font-semibold">{skill.title}</div>
                                <div className="text-sm text-gray-800/70">{skill.context}</div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant="outline" onClick={() => handleEditSkill(skill.id)}>
                                    Modifier
                                </Button>
                                <Button variant="destructive" onClick={() => handleDeleteSkill(skill.id)}>
                                    Supprimer
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-6">
                    <Button variant="outline" className="w-full" onClick={handleGoBack}>
                        Retour au profil
                    </Button>
                </div>
            </>
        )
    }

    /**
     * Rendu du formulaire (création ou édition)
     */
    const renderForm = () => {
        // Titre du formulaire
        const titleForm = mode === 'create' ? 'Nouvelle Compétence' : 'Modifier la Compétence'
        // Bouton principal
        const submitLabel = mode === 'create' ? 'Ajouter' : 'Enregistrer'

        return (
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <Card className="bg-card-custom">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">{titleForm}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom de la compétence</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Développer HTML/CSS" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="context"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contexte</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Incubateur AI, CapGemini, Facebook" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-end space-x-2">
                            <Button variant="outline" type="button" onClick={handleGoBack} className="text-black">
                                Annuler
                            </Button>
                            <Button variant="default" type="submit">
                                {submitLabel}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        )
    }

    return (
        <div className="mx-auto w-full max-w-sm p-4">
            {/* En-tête : titre centré + bouton “Nouveau” à droite (seulement en mode liste) */}
            <div className="relative flex items-center justify-center mb-6">
                <h1 className="text-xl font-bold">Compétences</h1>
                {mode === 'list' && (
                    <Button variant="default" className="absolute right-0" onClick={handleNewSkill}>
                        Nouveau
                    </Button>
                )}
            </div>

            {/* Affichage conditionnel selon le mode */}
            {mode === 'list' && renderList() }
            {(mode === 'create' || mode === 'edit') && renderForm()}
        </div>
    )
}
