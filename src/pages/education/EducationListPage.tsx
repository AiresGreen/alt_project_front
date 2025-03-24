import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

// shadcn UI components (à adapter selon votre arborescence)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

// Icônes lucide-react
import { Edit, Trash2 } from "lucide-react";

// Validation via Zod et hookform resolvers
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Détection responsivité
import { useMediaQuery } from "react-responsive";

// Contexte d'authentification
import { AuthContext } from "@/hook/contexts/auth.context";

/** *******************************************************
 *             Schémas Zod pour la validation
 *********************************************************/
// Projet
const projectSchema = z.object({
    name: z.string().nonempty("Le nom du projet est requis"),
    description: z.string().nonempty("La description est requise"),
    start: z.string().nonempty("La date de début est requise"),
    end: z.string().optional(),
});
type ProjectFormData = z.infer<typeof projectSchema>;

// Formation
const formationSchema = z.object({
    organisme: z.string().nonempty("Le nom de l'organisme est requis"),
    diplome: z.string().nonempty("Le diplôme est requis"),
    niveau: z.string().nonempty("Le niveau est requis"),
    adresse: z.string().optional(),
    cp: z.string().optional(),
    ville: z.string().optional(),
    pays: z.string().optional(),
    startDate: z.string().nonempty("La date de début est requise"),
    endDate: z.string().optional(),
});
type FormationFormData = z.infer<typeof formationSchema>;

/** *******************************************************
 *          Types pour les données (simulées)
 *********************************************************/
type Project = {
    // id est présent uniquement en interne (non affiché)
    id: string;
    name: string;
    description: string;
    start: string;
    end?: string;
};

type Formation = {
    id: string;
    organisme: string;
    diplome: string;
    niveau: string;
    adresse?: string;
    cp?: string;
    ville?: string;
    pays?: string;
    startDate: string;
    endDate?: string;
};

export default function EducationListePage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    // Détection Mobile / PC
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isPC = useMediaQuery({ minWidth: 1025 });

    // États locaux pour les listes simulées
    const [projects, setProjects] = useState<Project[]>([]);
    const [formations, setFormations] = useState<Formation[]>([]);

    // États pour l'édition : contient les données de l'élément à modifier ou null
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
    const [formationToEdit, setFormationToEdit] = useState<Formation | null>(null);

    // Formulaire d'ajout pour les projets
    const {
        register: registerProject,
        handleSubmit: handleSubmitProject,
        reset: resetProjectForm,
        formState: { errors: errorsProject },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    // Formulaire d'édition pour les projets
    const {
        register: registerProjectEdit,
        handleSubmit: handleSubmitProjectEdit,
        reset: resetProjectEditForm,
        formState: { errors: errorsProjectEdit },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    // Formulaire d'ajout pour les formations
    const {
        register: registerFormation,
        handleSubmit: handleSubmitFormation,
        reset: resetFormationForm,
        formState: { errors: errorsFormation },
    } = useForm<FormationFormData>({
        resolver: zodResolver(formationSchema),
    });

    // Formulaire d'édition pour les formations
    const {
        register: registerFormationEdit,
        handleSubmit: handleSubmitFormationEdit,
        reset: resetFormationEditForm,
        formState: { errors: errorsFormationEdit },
    } = useForm<FormationFormData>({
        resolver: zodResolver(formationSchema),
    });

    /*******************************
     * Gestion des Projets (simulée)
     *******************************/
    const onSubmitProject = (data: ProjectFormData) => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: data.name,
            description: data.description,
            start: data.start,
            end: data.end,
        };
        setProjects((prev) => [...prev, newProject]);
        resetProjectForm();
    };

    const onSubmitProjectEdit = (data: ProjectFormData) => {
        if (!projectToEdit) return;
        setProjects((prev) =>
            prev.map((proj) =>
                proj.id === projectToEdit.id ? { ...proj, ...data } : proj
            )
        );
        setProjectToEdit(null);
        resetProjectEditForm();
    };

    const deleteProject = (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
        setProjects((prev) => prev.filter((proj) => proj.id !== id));
    };

    /*******************************
     * Gestion des Formations (simulée)
     *******************************/
    const onSubmitFormation = (data: FormationFormData) => {
        const newFormation: Formation = {
            id: Date.now().toString(),
            organisme: data.organisme,
            diplome: data.diplome,
            niveau: data.niveau,
            adresse: data.adresse,
            cp: data.cp,
            ville: data.ville,
            pays: data.pays,
            startDate: data.startDate,
            endDate: data.endDate,
        };
        setFormations((prev) => [...prev, newFormation]);
        resetFormationForm();
    };

    const onSubmitFormationEdit = (data: FormationFormData) => {
        if (!formationToEdit) return;
        setFormations((prev) =>
            prev.map((form) =>
                form.id === formationToEdit.id ? { ...form, ...data } : form
            )
        );
        setFormationToEdit(null);
        resetFormationEditForm();
    };

    const deleteFormation = (id: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette formation ?")) return;
        setFormations((prev) => prev.filter((form) => form.id !== id));
    };

    /*******************************
     * Rendu JSX (uniquement si connecté)
     *******************************/
    if (!isAuthenticated) {
        return (
            <div className="p-4">
                <p className="text-red-600">
                    Vous devez être connecté pour accéder à cette page.
                </p>
                <Button variant="outline" onClick={() => navigate("/login")}>
                    Se connecter
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-8">
            {/* Liens de navigation visibles uniquement sur PC */}
            {isPC && (
                <nav className="flex items-center gap-4 mb-4">
                    <Link to="/" className="text-blue-600 hover:underline">
                        Accueil
                    </Link>
                    <Link to="/dashboard" className="text-blue-600 hover:underline">
                        Dashboard
                    </Link>
                    <Link to="/profile" className="text-blue-600 hover:underline">
                        Profil
                    </Link>
                </nav>
            )}

            <h1 className="text-2xl font-bold">Gestion Projets & Formations</h1>

            {/* Section d'ajout de Projets */}
            <Card className={"bg-card-custom text-black"}>
                <CardHeader>
                    <CardTitle>Projets</CardTitle>
                    <CardDescription className={"text-gray-700"}>Ajoutez un nouveau projet</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmitProject(onSubmitProject)} className="grid gap-4">
                        <div>
                            <Label htmlFor="projectName">Nom du projet</Label>
                            <Input id="projectName" placeholder="Nom du projet" {...registerProject("name")} />
                            {errorsProject.name && <p className="text-red-600 text-sm mt-1">{errorsProject.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="projectDescription">Description</Label>
                            <Input id="projectDescription" placeholder="Description" {...registerProject("description")} />
                            {errorsProject.description && <p className="text-red-600 text-sm mt-1">{errorsProject.description.message}</p>}
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1">
                                <Label htmlFor="projectStart">Date de début</Label>
                                <Input type="date" id="projectStart" {...registerProject("start")} />
                                {errorsProject.start && <p className="text-red-600 text-sm mt-1">{errorsProject.start.message}</p>}
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="projectEnd">Date de fin</Label>
                                <Input type="date" id="projectEnd" {...registerProject("end")} />
                                {errorsProject.end && <p className="text-red-600 text-sm mt-1">{errorsProject.end.message}</p>}
                            </div>
                        </div>
                        <CardFooter className="p-0 mt-2">
                            <Button type="submit">Ajouter Projet</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

            {/* Formulaire d'édition de Projet (affiché si un projet est sélectionné) */}
            {projectToEdit && (
                <Card className="border-2 border-dashed border-gray-400 bg-gray-100 text-black">
                    <CardHeader>
                        <CardTitle>Modifier Projet</CardTitle>
                        <CardDescription className={"text-gray-700"}>Modifiez les informations du projet</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitProjectEdit(onSubmitProjectEdit)} className="grid gap-4">
                            <div>
                                <Label htmlFor="projectEditName">Nom du projet</Label>
                                <Input
                                    id="projectEditName"
                                    defaultValue={projectToEdit.name}
                                    {...registerProjectEdit("name")}
                                />
                                {errorsProjectEdit.name && <p className="text-red-600 text-sm mt-1">{errorsProjectEdit.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="projectEditDescription">Description</Label>
                                <Input
                                    id="projectEditDescription"
                                    defaultValue={projectToEdit.description}
                                    {...registerProjectEdit("description")}
                                />
                                {errorsProjectEdit.description && <p className="text-red-600 text-sm mt-1">{errorsProjectEdit.description.message}</p>}
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1">
                                    <Label htmlFor="projectEditStart">Date de début</Label>
                                    <Input
                                        type="date"
                                        id="projectEditStart"
                                        defaultValue={projectToEdit.start}
                                        {...registerProjectEdit("start")}
                                    />
                                    {errorsProjectEdit.start && <p className="text-red-600 text-sm mt-1">{errorsProjectEdit.start.message}</p>}
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="projectEditEnd">Date de fin</Label>
                                    <Input
                                        type="date"
                                        id="projectEditEnd"
                                        defaultValue={projectToEdit.end || ""}
                                        {...registerProjectEdit("end")}
                                    />
                                    {errorsProjectEdit.end && <p className="text-red-600 text-sm mt-1">{errorsProjectEdit.end.message}</p>}
                                </div>
                            </div>
                            <CardFooter className="p-0 mt-2">
                                <Button type="submit">Enregistrer</Button>
                                <Button variant="outline" className="ml-2" onClick={() => setProjectToEdit(null)}>
                                    Annuler
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Liste des Projets */}
            <div className="overflow-x-auto">
                {projects.length === 0 ? (
                    <p>Aucun projet ajouté.</p>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead className="bg-blue-500">
                        <tr>
                            <th className="p-2 text-left">Nom</th>
                            <th className="p-2 text-left">Description</th>
                            <th className="p-2 text-left">Dates</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className={"bg-white"}>
                        {projects.map((proj) => (
                            <tr key={proj.id} className="border-b last:border-none">
                                <td className="p-2">{proj.name}</td>
                                <td className="p-2">{proj.description}</td>
                                <td className="p-2">{proj.start} - {proj.end || ""}</td>
                                <td className="p-2 flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setProjectToEdit(proj)}>
                                        <Edit className="w-4 h-4 mr-1" />
                                        Modifier
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => deleteProject(proj.id)}>
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Section d'ajout de Formations */}
            <Card className={"text-black bg-card-custom"}>
                <CardHeader>
                    <CardTitle className={"text-black"}>Formations</CardTitle>
                    <CardDescription className={"text-gray-700"}>Ajoutez une nouvelle formation</CardDescription>
                </CardHeader>
                <CardContent >
                    <form onSubmit={handleSubmitFormation(onSubmitFormation)} className="grid gap-4">
                        <div>
                            <Label htmlFor="organisme">Organisme formateur</Label>
                            <Input id="organisme" placeholder="Organisme" {...registerFormation("organisme")} />
                            {errorsFormation.organisme && <p className="text-red-600 text-sm mt-1">{errorsFormation.organisme.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="diplome">Diplôme / Certification</Label>
                            <Input id="diplome" placeholder="Diplôme" {...registerFormation("diplome")} />
                            {errorsFormation.diplome && <p className="text-red-600 text-sm mt-1">{errorsFormation.diplome.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="niveau">Niveau</Label>
                            <select id="niveau" className="border border-gray-300 rounded-md p-2 w-full" {...registerFormation("niveau")}>
                                <option value="">-- Sélectionnez --</option>
                                <option value="Bac">Bac</option>
                                <option value="Bac+2">Bac+2</option>
                                <option value="Bac+3">Bac+3</option>
                                <option value="Master">Master</option>
                                <option value="Doctorat">Doctorat</option>
                            </select>
                            {errorsFormation.niveau && <p className="text-red-600 text-sm mt-1">{errorsFormation.niveau.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="adresse">Adresse</Label>
                            <Input id="adresse" placeholder="Adresse" {...registerFormation("adresse")} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1">
                                <Label htmlFor="cp">Code Postal</Label>
                                <Input id="cp" placeholder="Code Postal" {...registerFormation("cp")} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="ville">Ville</Label>
                                <Input id="ville" placeholder="Ville" {...registerFormation("ville")} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="pays">Pays</Label>
                            <Input id="pays" placeholder="Pays" {...registerFormation("pays")} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1">
                                <Label htmlFor="startDate">Date de début</Label>
                                <Input type="date" id="startDate" {...registerFormation("startDate")} />
                                {errorsFormation.startDate && <p className="text-red-600 text-sm mt-1">{errorsFormation.startDate.message}</p>}
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="endDate">Date de fin</Label>
                                <Input type="date" id="endDate" {...registerFormation("endDate")} />
                                {errorsFormation.endDate && <p className="text-red-600 text-sm mt-1">{errorsFormation.endDate.message}</p>}
                            </div>
                        </div>
                        <CardFooter className="p-0 mt-2">
                            <Button type="submit">Ajouter Formation</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>

            {/* Formulaire d'édition de Formation (affiché si une formation est sélectionnée) */}
            {formationToEdit && (
                <Card className="border-2 border-dashed border-gray-400 bg-white text-black">
                    <CardHeader>
                        <CardTitle>Modifier Formation</CardTitle>
                        <CardDescription>Modifiez les informations de la formation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmitFormationEdit(onSubmitFormationEdit)} className="grid gap-4">
                            <div>
                                <Label htmlFor="formationEditOrganisme">Organisme formateur</Label>
                                <Input
                                    id="formationEditOrganisme"
                                    defaultValue={formationToEdit.organisme}
                                    {...registerFormationEdit("organisme")}
                                />
                                {errorsFormationEdit.organisme && <p className="text-red-600 text-sm mt-1">{errorsFormationEdit.organisme.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="formationEditDiplome">Diplôme / Certification</Label>
                                <Input
                                    id="formationEditDiplome"
                                    defaultValue={formationToEdit.diplome}
                                    {...registerFormationEdit("diplome")}
                                />
                                {errorsFormationEdit.diplome && <p className="text-red-600 text-sm mt-1">{errorsFormationEdit.diplome.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="formationEditNiveau">Niveau</Label>
                                <select
                                    id="formationEditNiveau"
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                    defaultValue={formationToEdit.niveau}
                                    {...registerFormationEdit("niveau")}
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="Bac">Bac</option>
                                    <option value="Bac+2">Bac+2</option>
                                    <option value="Bac+3">Bac+3</option>
                                    <option value="Master">Master</option>
                                    <option value="Doctorat">Doctorat</option>
                                </select>
                                {errorsFormationEdit.niveau && <p className="text-red-600 text-sm mt-1">{errorsFormationEdit.niveau.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="formationEditAdresse">Adresse</Label>
                                <Input
                                    id="formationEditAdresse"
                                    defaultValue={formationToEdit.adresse || ""}
                                    {...registerFormationEdit("adresse")}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1">
                                    <Label htmlFor="formationEditCp">Code Postal</Label>
                                    <Input
                                        id="formationEditCp"
                                        defaultValue={formationToEdit.cp || ""}
                                        {...registerFormationEdit("cp")}
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="formationEditVille">Ville</Label>
                                    <Input
                                        id="formationEditVille"
                                        defaultValue={formationToEdit.ville || ""}
                                        {...registerFormationEdit("ville")}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="formationEditPays">Pays</Label>
                                <Input
                                    id="formationEditPays"
                                    defaultValue={formationToEdit.pays || ""}
                                    {...registerFormationEdit("pays")}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex-1">
                                    <Label htmlFor="formationEditStartDate">Date de début</Label>
                                    <Input
                                        type="date"
                                        id="formationEditStartDate"
                                        defaultValue={formationToEdit.startDate}
                                        {...registerFormationEdit("startDate")}
                                    />
                                    {errorsFormationEdit.startDate && <p className="text-red-600 text-sm mt-1">{errorsFormationEdit.startDate.message}</p>}
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="formationEditEndDate">Date de fin</Label>
                                    <Input
                                        type="date"
                                        id="formationEditEndDate"
                                        defaultValue={formationToEdit.endDate || ""}
                                        {...registerFormationEdit("endDate")}
                                    />
                                    {errorsFormationEdit.endDate && <p className="text-red-600 text-sm mt-1">{errorsFormationEdit.endDate.message}</p>}
                                </div>
                            </div>
                            <CardFooter className="p-0 mt-2">
                                <Button type="submit">Enregistrer</Button>
                                <Button variant="outline" className="ml-2" onClick={() => setFormationToEdit(null)}>
                                    Annuler
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Liste des Formations */}
            <div className="overflow-x-auto">
                {formations.length === 0 ? (
                    <p>Aucune formation ajoutée.</p>
                ) : (
                    <table className="min-w-full text-sm">
                        <thead className="bg-blue-500">
                        <tr>
                            <th className="p-2 text-left">Organisme</th>
                            <th className="p-2 text-left">Diplôme</th>
                            <th className="p-2 text-left">Niveau</th>
                            <th className="p-2 text-left">Dates</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody className={"bg-white"}>
                        {formations.map((form) => (
                            <tr key={form.id} className="border-b last:border-none">
                                <td className="p-2">{form.organisme}</td>
                                <td className="p-2">{form.diplome}</td>
                                <td className="p-2">{form.niveau}</td>
                                <td className="p-2">{form.startDate} - {form.endDate || ""}</td>
                                <td className="p-2 flex items-center gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setFormationToEdit(form)}>
                                        <Edit className="w-4 h-4 mr-1" />
                                        Modifier
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => deleteFormation(form.id)}>
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Indicateur pour mobile */}
            {isMobile && (
                <div className="bg-yellow-100 p-4 rounded-md">
                    <p className="text-yellow-800">Mode mobile (adaptive layout).</p>
                </div>
            )}
        </div>
    );
}
