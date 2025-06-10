import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {BackButton} from "@/components/BackButton/BackButton.tsx";
import {z} from "zod";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {LanguageInterface, UserLanguage} from "@/interface/LanguageInterface";
import {addLangue, deleteLangue, getLanguageOfUser, getLangues, getLevels, updateLangue} from "@/services/api/languageApi.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import  {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
//import {useParams} from "react-router-dom";
import { useAuth } from "@/hook/useAuth";




const langueSchema = z.object({
    langEnglishName: z.string(),
    level: z.string(),
})

type LanguesFromValues = z.infer<typeof langueSchema>;


export const LanguagesListPage = () => {
    const { userId, isAuthenticated } = useAuth();


    const form = useForm<LanguesFromValues>(
        {
            resolver: zodResolver(langueSchema),
            defaultValues:
                {
                    langEnglishName: "",
                    level: "",
                }
        }
    )

    //==Appel api get
    // 1) Charger la liste complète des langues
    const {
        data: apiLanguages = [],
        isLoading,
        isError,
    } = useQuery<LanguageInterface[]>(
        {
            queryKey: ["langues"],
            queryFn: () => getLangues()
        }
    );
    // 2) Charger les niveaux (levels)
    const apiLevels = useQuery<string[]>(
        {
            queryKey: ["levelsFromApi"],
            queryFn: () => getLevels()
        }
    );

    // 3) Charger les langues déjà associées à l’utilisateur
    const {
        data: getUserLanguages = [],
        isLoading: isLoadingUserLanguages,
        isError: isErrorUserLanguages,
    } = useQuery<UserLanguage[]>({
        queryKey: ["usersLanguages", userId],
        queryFn: () => getLanguageOfUser(userId),
        enabled: Boolean(userId),

        });


    // =============== MUTATIONS (POST, PUT, DELETE) ===============
    //==Appel API Put /languages/:id pour éditer une langue
    const { mutate: editLangue } = useMutation({
        mutationFn: ({ id, ...payload }: { id: string } & LanguesFromValues) =>
            updateLangue(id, payload),
        onSuccess: () => {
            toast.success("Langue modifiée avec succès");
            queryClient.invalidateQueries({ queryKey: ["langues", userId] });
            queryClient.invalidateQueries({ queryKey: ["usersLanguages", userId] });
            resetForm();
        },
        onError: () => toast.error("Erreur lors de la modification"),
    });



    //==Appel api post /languages pour ajouter une nouvelle langue

    const queryClient = useQueryClient();

    const { mutate: createLangue, isPending: isAdding } = useMutation<
        void, // retour
        unknown, // erreur
        LanguesFromValues
    >({
        mutationFn: addLangue,
        onSuccess: ( ) => {
            toast.success("Langue ajoutée avec succès");
            queryClient.invalidateQueries({ queryKey: ["langues", userId] });
            queryClient.invalidateQueries({ queryKey: ["usersLanguages", userId] });
            resetForm();
        },
        onError: (error: any) => {
            toast.error(error.message || "Erreur lors de l’ajout");
        },
    });

    //==Appel API delete /languages/:id pour supprimer une langue

    const { mutate: removeLangue } = useMutation({
        mutationFn: deleteLangue,
        onSuccess: () => {
            toast("Langue supprimée");
            queryClient.invalidateQueries({ queryKey: ["langues", userId] });
            queryClient.invalidateQueries({ queryKey: ["usersLanguages", userId] });
        },
        onError: () => toast.error("Erreur lors de la suppression"),
    });



    //==== Gestion de l’état

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<any | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { langEnglishName, level } = form.getValues();

        if (!langEnglishName.trim() || !level.trim()) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        if (isEditing && editId !== null) {
            editLangue({ id: editId, langEnglishName, level });
        } else {
            createLangue({ langEnglishName, level });
        }
    };


    const handleEdit = (langue: UserLanguage) => {
        setIsEditing(true);
        setEditId(langue.language_id.toString());
        form.setValue("langEnglishName", langue.language.langEnglishName);
        form.setValue("level", langue.level);
    };

    const handleDelete = (id: string) => {
        removeLangue(id);
        toast("Langue supprimée");

    };

    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        form.reset();
        form.setFocus("langEnglishName")

    };


    if (!isAuthenticated || !userId) {
        return <div>Chargement…</div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* Formulaire de création / édition */}
            <Card className="" data-testid="language-card">
                <CardHeader data-cy={"card-title-langue"}>
                    <CardTitle  className="text-lg font-bold">
                        {isEditing ? "Modifier une langue" : "Ajouter une nouvelle langue"}
                    </CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 text-black">
                            {isLoading && <span>Loading...</span>}
                            {isError && <span>Erreur</span>}
                            {isAdding && <span>Adding...</span>}
                            {apiLanguages.length> 0 && (
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="langEnglishName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Langues :</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger data-cy="langueFormTrigger">
                                                            <SelectValue placeholder="Choisissez votre niveau de langue" />
                                                        </SelectTrigger>
                                                        <SelectContent className={'bg-white text-black border rounded p-2 w-2/5' }>
                                                            {apiLanguages.map((langue) => (
                                                                <SelectItem
                                                                    key={langue.id}
                                                                    value={langue.langEnglishName}
                                                                    data-cy={`langue-option-${langue.langEnglishName}`}
                                                                    data-value={langue.langEnglishName}
                                                                >
                                                                    {langue.langEnglishName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        {isLoading && <span>Loading...</span>}
                                        {isError && <span>Erreur</span>}
                                        <FormLabel>Niveau :</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <SelectTrigger data-cy="levelsFormTrigger">
                                                    <SelectValue placeholder="Choisissez votre niveau de langue" />
                                                </SelectTrigger>
                                                <SelectContent className={'bg-white text-black border rounded p-2 w-2' }>
                                                    {apiLevels.data?.map((level) => (
                                                        <SelectItem
                                                            key={level}
                                                            value={level}
                                                            data-cy={`level-option-${level}`}
                                                            data-value={level}
                                                        >
                                                            {level}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex items-center space-x-4">
                            <Button type="submit"
                                    variant="default"
                                    disabled={isAdding}
                                    data-cy={"confirm-button"}>
                                {isEditing ? "Enregistrer" : isAdding ? "Ajout en cours..." : "Ajouter"}
                            </Button>
                            {isEditing && (
                                <Button type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        className={'text-black'}>
                                    Annuler
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            {/* Liste des langues */}
            <div className={""}>
                <h2 data-cy={"card-title-safed"} className="text-xl font-semibold mb-4 text-black">Langues enregistrées</h2>
                {isLoadingUserLanguages && <span>Loading...</span>}
                {isErrorUserLanguages && <span>Erreur</span>}
                {getUserLanguages.length === 0 ? (
                    <p>Aucune langue pour le moment.</p>
                ) : (
                    <div className="grid gap-4">
                        {getUserLanguages.map((usersLanguages)=> {
                            const reactKey = `${usersLanguages.language.langEnglishName}-${usersLanguages.level}`;
                            return (
                            <Card data-testid="language-card" key={reactKey}
                                  className="border ">
                                <CardHeader>
                                    <CardTitle>
                                        {usersLanguages.language.langEnglishName}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>
                                        <strong>Niveau :</strong> {usersLanguages.level}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex space-x-2">
                                    <Button
                                        data-cy="change-button"
                                        onClick={() => handleEdit(usersLanguages)}
                                        variant="secondary"
                                        size="sm"
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        data-cy="delete-botton"
                                        onClick={() => handleDelete(usersLanguages.language_id.toString())}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Supprimer
                                    </Button>
                                </CardFooter>
                            </Card>
                        )})}
                    </div>
                )}
            </div>

            {/* Bouton de retour */}
            <div>
                <BackButton/>
            </div>
        </div>
    );
};
