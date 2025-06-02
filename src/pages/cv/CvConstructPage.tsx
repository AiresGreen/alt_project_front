import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { Printer } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Form
} from "@/components/ui/form";
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/hook/contexts/auth.context";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { BackButton } from "@/components/BackButton/BackButton.tsx";
import html2pdf from "html2pdf.js";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
import {
    getCurrentEducation,
    getCurrentExperience,
    getCurrentHobbies,
    getCurrentProfile,
    getCurrentProjects, getCurrentSkills,
    getCurrentUsefulInfo,
    getCurrentUser, getLangues
} from "@/services/api/cvConstruct.ts";
import {IUserProfile} from "@/interface/UserInterface.ts";
import {useQuery} from "@tanstack/react-query";
import {ProfileInterface} from "@/interface/ProfileInterface.ts";
import {UsefulInfoInterface} from "@/interface/UsefulInfoInterface.ts";
import {useParams} from "react-router-dom";
import {Hobby} from "@/interface/HobbyInterface.ts";
import {LanguageInterface} from "@/interface/LanguageInterface.ts";
import {SkillInterface} from "@/interface/SkillInterface.ts";
import {ProjectInterface} from "@/interface/ProjectInterfaces.ts";
import {EducationInterface} from "@/interface/EducationInterface.ts";
import {ExperienceInterface} from "@/interface/ExperienceInterface.ts";

type Props = {
    label: string;
    options: string[];
    value: string[];
    onChange: (values: string[]) => void;
};

export const MultiSelect = ({ label, options, value, onChange }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start ">
                    {value.length ? value.join(", ") : `Sélectionner ${label}`}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={"bg-gray-300"}>
                    <CommandInput className={"text-black"} placeholder={`Rechercher ${label}`} />
                    <CommandList className={"text-black"}>
                        {options.map((opt) => (
                            <CommandItem
                                key={opt}
                                onSelect={() => {
                                    const selected = value.includes(opt)
                                        ? value.filter((v) => v !== opt)
                                        : [...value, opt];
                                    onChange(selected);
                                }}
                            >
                                <Check
                                    className={`mr-2 h-4 w-4 ${
                                        value.includes(opt) ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                                {opt}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


/*const experienceOptions = ["Miaou", "Piaou", "PitouPitou"];
const educationOptions = ["Nia", "Nou", "FILOU"];
const projects = ["CRM BalanceTonJob", "Bla-Bla Boop"];
const interests = ["Cinéma", "Jeux vidéo", "Lecture"];
const skillsOptions = ["Communication", "Informatique"];
const nameOptions = ["Jean", "Marie", "Alex"];
const lastnameOptions = ["Dupont", "Durand", "Lemoine"];
const languagesOptions = ["Français", "Anglais"]*/


const cvSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    title: z.string().nonempty("Le titre est requis"),
    summary: z.string().nonempty("Le résumé est requis"),
    languages: z.array(z.string()).nonempty("La langue est requise"),
    skills: z.array(z.string()).optional(),
    experience: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
    project: z.array(z.string()).optional(),
    interest: z.array(z.string()).optional(),
    email: z.string().nonempty("e-mail est requis"),
    street: z.string().nonempty("La rue est requise"),
    zip_code: z.string().nonempty("CP est requis"),
    city: z.string().nonempty("La ville est requise"),
    phone_number: z.string().nonempty("Le numéro de téléphone est requis"),
    useful_info: z.array(z.string()).optional(),
    picture: z.string().optional(),
});

type CVFormValues = z.infer<typeof cvSchema>;

export const CvConstructPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const printRef = useRef<HTMLDivElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current as HTMLDivElement,
        documentTitle: "MonCV",
    } as any);

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    const form = useForm<CVFormValues>({
        resolver: zodResolver(cvSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            title: "",
            summary: "",
            languages: [],
            skills: [],
            experience: [],
            education: [],
            project: [],
            interest: [],
            picture: "",
            email: "",
            street: "",
            zip_code: "",
            city: "",
            phone_number: "",
            useful_info: [],
        }
    });

//===Appel get current user, profile, useful-info, experience, skills, educ, projet, langues, hobbies,
    const { phone_number, user_id, id } = useParams<{ phone_number: string; user_id: string; id: string; }>();

    const {
        data: currentUser,
        isLoading: isLoadingUser,
        isError: isErrorUser,
    } = useQuery<IUserProfile[]>({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
            });

    const {
        data: currentProfile,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
    } = useQuery<ProfileInterface[] >({
        queryKey: ["currentProfile", phone_number],
        queryFn: () => getCurrentProfile(phone_number!),
        enabled: !!phone_number,
    });
    const profile = currentProfile?.[0]; // extrait le 1er profil

    const {
        data: currentUsefulInfo,
        isLoading: isLoadingUsefulInfo,
        isError: isErrorUsefulInfo,
    } = useQuery<UsefulInfoInterface[]>({
        queryKey: ["currentUsefulInfo", user_id],
        queryFn: () => getCurrentUsefulInfo(+user_id!),
        enabled: !!user_id,
    });

    const {
        data: currentExperience,
        isLoading: isLoadingExperience,
        isError: isErrorExperience,
    } = useQuery<ExperienceInterface[]>({
        queryKey: ["currentExperience", id],
        queryFn: () => getCurrentExperience(+id!),
        enabled: !!id,
    });

    const {
        data: langues,
        isLoading: isLoadingLangues,
        isError: isErrorLangues,
    } = useQuery<LanguageInterface[]>({
        queryKey: ["langues"],
        queryFn: () => getLangues(),
    });

    const {
        data: currentEducation,
        isLoading: isLoadingEducation,
        isError: isErrorEducation,
    } = useQuery<EducationInterface[]>({
        queryKey: ["currentEducation", id],
        queryFn: () => getCurrentEducation(+id!),
        enabled: !!id,
    });

    const {
        data: currentProjects,
        isLoading: isLoadingProjects,
        isError: isErrorProjects,
    } = useQuery<ProjectInterface[]>({
        queryKey: ["currentProjects", id],
        queryFn: () => getCurrentProjects(+id!),
        enabled: !!id,
    });

    const {
        data: currentHobbies,
        isLoading: isLoadingHobbies,
        isError: isErrorHobbies,
    } = useQuery<Hobby[]>({
        queryKey: ["currentHobbies", id],
        queryFn: () => getCurrentHobbies(+id!),
        enabled: !!id,
    });

    const {
        data: currentSkills,
        isLoading: isLoadingSkills,
        isError: isErrorSkills,
    } = useQuery<SkillInterface[]>({
        queryKey: ["currentSkills", id],
        queryFn: () => getCurrentSkills(+id!),
        enabled: !!id,
    });


    return (
    <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => {
                    console.log("Form Data:", values);
                    toast.success("CV sauvegardé avec succès !");
                })}
                className="p-4 gap-4 text-foreground grid grid-cols-1 lg:grid-cols-12"
            >
                {/* Colonne gauche - formulaire utilisateur */}
                <div className="lg:col-span-4 space-y-4 pr-6 border-r">
                    {/* Avatar */}
                    {isLoadingProfile && <span>Loading...</span>}
                    {isErrorProfile && <span>Erreur</span>}
                    {profile?.picture && (
                        <img
                            src={profile.picture}
                            alt="Avatar"
                            className="w-20 h-20 object-cover rounded"
                            data-cy="avatar-preview"
                        />
                    )}
                    {/* Bouton pour telecharger la photo */}
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                        data-cy="upload-photo"
                    >
                        Télécharger une photo
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    if (typeof reader.result === "string") {
                                        form.setValue("avatar", reader.result);
                                        setImagePreview(reader.result);
                                    }
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        data-cy="file-input"
                    />
                    <Button
                        variant="ghost"
                        className="w-full text-destructive"
                        onClick={() => {
                            form.setValue("avatar", "");
                            setImagePreview(null);
                        }}
                        data-cy="delete-avatar"
                    >
                        Supprimer
                    </Button>

                    {/* Prénom & Nom */}
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger data-cy="firstname-select">
                                            <SelectValue placeholder="Choisissez votre prénom" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {isLoadingUser && <span>Loading...</span>}
                                            {isErrorUser && <span>Erreur</span>}
                                            {currentUser && (
                                                <SelectItem
                                                    key={currentUser.firstname}
                                                    value={currentUser.firstname}
                                                    data-cy="firstname-option"
                                                    data-value={currentUser.firstname}
                                                >
                                                    {currentUser.firstname}
                                                </SelectItem>
                                                )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger data-cy="lastname-select">
                                            <SelectValue placeholder="Choisissez votre nom" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {isLoadingUser && <span>Loading...</span>}
                                            {isErrorUser && <span>Erreur</span>}
                                            {currentUser (
                                                <SelectItem
                                                    key={currentUser.lastname}
                                                    value={currentUser.lastname}
                                                    data-cy="lastname-option"
                                                    data-value={currentUser.lastname}
                                                >
                                                    {currentUser.lastname}
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Champ : Titre du CV */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre du CV</FormLabel>
                                <FormControl>
                  <textarea
                      {...field}
                      placeholder="Entrez le titre de votre CV"
                      className="border rounded p-2 w-full"
                      data-cy="cv-title-textarea"
                  />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Champ : Description du CV */}
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description du CV</FormLabel>
                                <FormControl>
                  <textarea
                      {...field}
                      placeholder="Ajoutez une brève description de votre profil"
                      className="border rounded p-2 w-full"
                      data-cy="cv-summary-textarea"
                  />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Champ : Langues */}
                   {/* <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Langues</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Ex : Français - maternel, Anglais - B1"
                                        className="border rounded p-2 w-full"
                                        data-cy="languages-input"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />*/}

                    {/* Autres sélections : compétences, expérience, formation, projets, centres d'intérêt */}
                    {isLoadingLangues && <span>Loading...</span>}
                    {isErrorLangues && <span>Erreur</span>}
                    {isLoadingSkills && <span>Loading...</span>}
                    {isErrorSkills && <span>Erreur</span>}
                    {isLoadingExperience && <span>Loading...</span>}
                    {isErrorExperience && <span>Erreur</span>}
                    {isLoadingEducation && <span>Loading...</span>}
                    {isErrorEducation && <span>Erreur</span>}
                    {isLoadingProjects && <span>Loading...</span>}
                    {isErrorProjects && <span>Erreur</span>}
                    {isLoadingHobbies && <span>Loading...</span>}
                    {isErrorHobbies && <span>Erreur</span>}
                    {isLoadingUser && <span>Loading...</span>}
                    {isErrorUser && <span>Erreur</span>}
                    {isLoadingProfile && <span>Loading...</span>}
                    {isErrorProfile && <span>Erreur</span>}
                    {isLoadingUsefulInfo && <span>Loading...</span>}
                    {isErrorUsefulInfo && <span>Erreur</span>}
                    {(["languages", "skills", "experience", "education", "project", "interest", "email", "street", "zip_code", "city", "phone_number", "useful_info"] as const).map((field) => {

                        const fieldOptions: Record <string, string> =  {
                            languages: {langues},
                            skills: {currentSkills},
                            experience: {currentExperience},
                            education: {currentEducation},
                            project: {currentProjects},
                            interest: {currentHobbies},
                            email: {currentUser: email},
                            street: {currentProfile: street},
                            zip_code: {currentProfile: zip_code},
                            city: {currentProfile: city},
                            phone_number: {currentProfile: phone_number},
                            useful_info: {currentUsefulInfo},

                        };

                        return (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field}
                                render={({ field: { value } }) => (
                                    <FormItem>
                                        <FormLabel className="capitalize">{field}</FormLabel>
                                        <MultiSelect
                                            label={field}
                                            options={fieldOptions}
                                            value={value}
                                            onChange={(vals) => form.setValue(field, vals)}
                                        />
                                    </FormItem>
                                )}
                            />
                        );
                    })}

                </div>

                {/* Colonne droite - aperçu CV */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-end gap-12">
                        <Button
                            onClick={() => {
                                form.trigger(); // force la validation pour forcer un re-render propre
                                setTimeout(() => {
                                    console.log("💡 ref DOM :", printRef.current);
                                    handlePrint();
                                }, 100); // laisse le temps au DOM de se rafraîchir
                            }}
                            data-cy="download-pdf"
                        >
                            <Printer className="w-4 h-4" />
                            Imprimer
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                const element = printRef.current;
                                if (!element) {
                                    toast.error("Impossible de générer le PDF");
                                    return;
                                }

                                html2pdf()
                                    .set({
                                        margin: 0.5,
                                        filename: `CV_${form.getValues("firstname")}_${form.getValues("lastname")}.pdf`,
                                        image: { type: "jpeg", quality: 0.98 },
                                        html2canvas: { scale: 2 },
                                        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
                                    })
                                    .from(element)
                                    .save();
                            }}
                            data-cy="save-pdf"
                        >
                            📥 Télécharger le PDF
                        </Button>
                        <BackButton data-cy="back-button" />
                    </div>

                    <div
                        ref={printRef}
                        id="cv-to-print"
                        className="bg-white p-8 rounded shadow-md w-full font-sans print:text-black print:bg-white print:shadow-none print:p-4"
                    >
                        {/* En-tête */}
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <div>
                                <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-800">
                                    {form.watch("firstname")} {form.watch("lastname")}
                                </h1>
                                {form.watch("title") && (
                                    <p className="text-sm text-gray-600 mt-1">{form.watch("title")}</p>
                                )}
                            </div>

                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Avatar"
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                            )}
                        </div>

                        {/* Sections dynamiques */}
                        {(["summary", "languages", "experience", "education", "skills", "project", "interest", "email", "street", "zip_code", "city", "phone_number", "useful_info" ] as const).map((field) => {
                            const values = form.watch(field);
                            if (!values || (Array.isArray(values) && values.length === 0)) return null;

                            const sectionTitles: Record<string, string> = {
                                summary: "Profil professionnel",
                                languages: "Langues parlées",
                                experience: "Expérience professionnelle",
                                education: "Formation",
                                skills: "Compétences",
                                project: "Projets réalisés",
                                interest: "Centres d’intérêt",
                                email: "E-mail",
                                street: "Rue",
                                zip_code: "CP",
                                city: "Ville",
                                phone_number: "Numéro de téléphone",
                                useful_info: "Information utile"
                            };

                            return (
                                <div key={field} className="mb-6">
                                    <h2 className="text-md font-semibold text-gray-700 border-b pb-1 mb-2 uppercase tracking-wide">
                                        {sectionTitles[field]}
                                    </h2>

                                    {Array.isArray(values) ? (
                                        <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                                            {values.map((val: string) => (
                                                <li key={val}>{val}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-800 whitespace-pre-line">{values}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bouton de soumission du formulaire */}
                    <div className="flex justify-end">
                        <Button type="submit" data-cy="submit-cv">
                            Enregistrer mon CV
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
