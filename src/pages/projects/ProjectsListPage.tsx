import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

// shadcn/ui - adapter le chemin selon votre installation
import { Button } from '@/components/ui/button'

// React Hook Form, useFieldArray, Zod et son resolver
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Librairie sonner pour les notifications
import { toast } from 'sonner'

// Interface du projet
import { ProjectInterface } from '@/interface/ProjectInterfaces.ts'
import {BackButton} from "@/components/BackButton/BackButton.tsx";

// Pour gérer un tableau d'objets tâches (chacun avec une propriété "name")
const projectSchema = z.object({
    title: z.string().min(1, 'Le titre est requis'),
    organization: z.string().min(1, 'Le nom de l’école ou entreprise est requis'),
    tasks: z
        .array(
            z.object({
                name: z.string().min(1, 'La tâche ne peut pas être vide'),
            })
        )
        .min(1, 'Ajoutez au moins une tâche'),
})

type ProjectFormData = z.infer<typeof projectSchema>

export default function ProjectsListPage() {
    const navigate = useNavigate()

    // Détection responsive : écran ≤768px
    const isMobile = useMediaQuery({ maxWidth: 768 })

    // État local : liste de projets
    const [projects, setProjects] = useState<ProjectInterface[]>([
        {
            id: 1,
            title: "Création d'une machine à cuire les œufs",
            organization: 'École Ingénieur',
            tasks: [
                'Dessin des plans',
                'Fabrication du prototype',
                'Validation du cahier des charges',
                'Programmation de l’interface',
            ],
        },
        {
            id: 2,
            title: "Industrialisation d'une machine de tri des moules de jambon",
            organization: 'Entreprise Lambda',
            tasks: [
                'Dessin des plans',
                'Fabrication du prototype',
                'Validation du cahier des charges',
                'Programmation de l’interface',
            ],
        },
    ])

    // État local : afficher ou non le formulaire "Nouveau projet"
    const [showNewProjectForm, setShowNewProjectForm] = useState(false)

    // Hook Form pour le formulaire "Nouveau projet"
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            organization: '',
            tasks: [{ name: '' }], // On commence avec une tâche vide
        },
    })

    const { fields, append, remove } = useFieldArray<ProjectFormData, 'tasks', 'id'>({
        control,
        name: 'tasks',
    })

    // Ajouter un nouveau projet lors de la soumission du formulaire
    const onSubmitNewProject = (data: ProjectFormData) => {
        const newProject: ProjectInterface = {
            id: Date.now(), // ID fictif
            title: data.title,
            organization: data.organization,
            // Extraction des noms des tâches
            tasks: data.tasks.map((task) => task.name),
        }
        setProjects((prev) => [...prev, newProject])
        setShowNewProjectForm(false)
        reset()
        toast.success('Nouveau projet ajouté !')
    }

    // Annuler la création (ferme le formulaire et réinitialise les champs)
    const handleCancelNewProject = () => {
        reset()
        setShowNewProjectForm(false)
        toast('Création annulée')
    }

    // Modifier une tâche existante (exemple via prompt)
    const handleEditTask = (projectId: number, taskIndex: number) => {
        const currentTask = projects.find((p) => p.id === projectId)?.tasks[taskIndex]
        const newTaskName = prompt('Entrez le nouveau nom de la tâche :', currentTask)
        if (!newTaskName) return

        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                if (project.id !== projectId) return project
                const updatedTasks = [...project.tasks]
                updatedTasks[taskIndex] = newTaskName
                return { ...project, tasks: updatedTasks }
            })
        )
        toast.success('Tâche modifiée !')
    }

    // Supprimer une tâche existante
    const handleDeleteTask = (projectId: number, taskIndex: number) => {
        setProjects((prevProjects) =>
            prevProjects.map((project) => {
                if (project.id !== projectId) return project
                const updatedTasks = project.tasks.filter((_, i) => i !== taskIndex)
                return { ...project, tasks: updatedTasks }
            })
        )
        toast.error('Tâche supprimée !')
    }

    return (
        <div className="w-full max-w-lg mx-auto p-4">

            {/* Header avec Formation, Expérience Pro, Nouveau */}
            <div className="flex items-center justify-between mb-4">
                <Button variant="link" onClick={() => navigate('/formation')}>
                    Formation
                </Button>
                <Button variant="link" onClick={() => navigate('/experience-pro')}>
                    Expérience Pro
                </Button>
                <Button
                    variant="default"
                    onClick={() => setShowNewProjectForm(!showNewProjectForm)}
                >
                    Nouveau
                </Button>
            </div>

            {/* Titre */}
            <h1 className="text-xl font-bold mb-4">PROJETS</h1>

            {/* Formulaire "Nouveau projet" */}
            {showNewProjectForm && (
                <form
                    onSubmit={handleSubmit(onSubmitNewProject)}
                    className="space-y-3 mb-6 border p-5 rounded bg-gray-50"
                >
                    {/* Champ Titre */}
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="title">
                            Titre du projet
                        </label>
                        <input
                            id="title"
                            type="text"
                            className="border w-full p-2 rounded"
                            {...register('title')}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Champ Organisation */}
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="organization">
                            École ou Entreprise
                        </label>
                        <input
                            id="organization"
                            type="text"
                            className="border w-full p-2 rounded"
                            {...register('organization')}
                        />
                        {errors.organization && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.organization.message}
                            </p>
                        )}
                    </div>

                    {/* Liste de tâches dynamiques */}
                    <div>
                        <p className="font-semibold mb-2">Tâches réalisées</p>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    className="border w-full p-2 rounded"
                                    {...register(`tasks.${index}.name` as const)}
                                />
                                <Button
                                    variant="destructive"
                                    type="button"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => append({ name: '' })}
                        >
                            + Tâche
                        </Button>
                        {errors.tasks && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tasks.message as string}
                            </p>
                        )}
                    </div>

                    {/* Boutons Enregistrer / Annuler */}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" type="button" onClick={handleCancelNewProject}>
                            Annuler
                        </Button>
                        <Button type="submit" variant="default">
                            Enregistrer
                        </Button>
                    </div>
                </form>
            )}

            {/* Liste des projets existants */}
            {projects.map((project) => (
                <div key={project.id} className="mb-6 bg-card-custom p-3 rounded">
                    <h2 className="text-lg font-semibold">{project.title}</h2>
                    <p className="text-sm text-gray-700 mb-2">{project.organization}</p>

                    {/* Liste des tâches */}
                    <ul className="space-y-2">
                        {project.tasks.map((task, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-2 rounded"
                            >
                                <span>{task}</span>
                                <div className="space-x-2">
                                    <Button
                                        variant="default"
                                        size={isMobile ? 'sm' : 'default'}
                                        onClick={() => handleEditTask(project.id, index)}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size={isMobile ? 'sm' : 'default'}
                                        onClick={() => handleDeleteTask(project.id, index)}
                                    >
                                        Supprimer
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Bouton "Retour au profil" */}
            <div className="mt-8">
                <BackButton/>
            </div>
        </div>
    )
}
