import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Printer } from "lucide-react";
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

const experienceOptions = ["Miaou", "Piaou", "PitouPitou"];
const educationOptions = ["Nia", "Nou", "FILOU"];
const projects = ["CRM BalanceTonJob", "Bla-Bla Boop"];
const interests = ["Cinéma", "Jeux vidéo", "Lecture"];
const skillsOptions = ["Communication", "Informatique"];
const nameOptions = ["Jean", "Marie", "Alex"];
const lastnameOptions = ["Dupont", "Durand", "Lemoine"];
const avatars = ["🧑‍💻", "🧕", "👨‍🚀", "👩‍🎨"];

const cvSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    title: z.string().nonempty("Le titre est requis"),
    summary: z.string().nonempty("Le résumé est requis"),
    languages: z.string().nonempty("La langue est requise"),
    skills: z.array(z.string()).optional(),
    experience: z.array(z.string()).optional(),
    education: z.array(z.string()).optional(),
    project: z.array(z.string()).optional(),
    interest: z.array(z.string()).optional(),
    avatar: z.string().optional()
});

type CVFormValues = z.infer<typeof cvSchema>;

export const CvConstructPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "MonCV"
    });

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
            languages: "",
            skills: [],
            experience: [],
            education: [],
            project: [],
            interest: [],
            avatar: ""
        }
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => console.log("Form Data:", values))}
                className="p-4 gap-4 bg-background text-foreground grid grid-cols-1 lg:grid-cols-12"
            >
                {/* Colonne gauche - formulaire utilisateur */}
                <div className="lg:col-span-4 space-y-4 pr-6 border-r">
                    {/* Avatar */}
                    {imagePreview && (
                        <img src={imagePreview} alt="Avatar" className="w-20 h-20 object-cover rounded" />
                    )}
                    <div className="grid grid-cols-4 gap-2 border p-2 rounded">
                        {avatars.map((a, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`text-2xl p-2 border rounded ${form.watch("avatar") === a ? "bg-primary text-white" : "hover:bg-muted"}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    form.setValue("avatar", a);
                                    setImagePreview(null);
                                }}
                            >
                                {a}
                            </button>
                        ))}
                    </div>
                    <Button variant="secondary" className="w-full" onClick={() => fileInputRef.current?.click()}>
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
                    />
                    <Button variant="ghost" className="w-full text-destructive" onClick={() => {
                        form.setValue("avatar", "");
                        setImagePreview(null);
                    }}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Choisissez votre prénom" /></SelectTrigger>
                                        <SelectContent>
                                            {nameOptions.map((opt) => (
                                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                            ))}
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger><SelectValue placeholder="Choisissez votre nom" /></SelectTrigger>
                                        <SelectContent>
                                            {lastnameOptions.map((opt) => (
                                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Autres sélections (Compétences, etc.) */}
                    {["skills", "experience", "education", "project", "interest"].map((field) => (
                        <FormField
                            key={field}
                            control={form.control}
                            name={field as keyof CVFormValues}
                            render={() => (
                                <FormItem>
                                    <FormLabel className="capitalize">{field}</FormLabel>
                                    <FormControl>
                                        <div className="flex flex-col space-y-1">
                                            {(form.getValues(field as keyof CVFormValues) as string[] | undefined)?.map((val) => (
                                                <Badge key={val} variant="secondary" className="flex justify-between items-center gap-2">
                                                    {val}
                                                    <X className="w-3 h-3 cursor-pointer" onClick={() => form.setValue(field as keyof CVFormValues, (form.getValues(field as keyof CVFormValues) as string[]).filter((v) => v !== val))} />
                                                </Badge>
                                            ))}
                                            {({ skills: skillsOptions, experience: experienceOptions, education: educationOptions, project: projects, interest: interests } as Record<string, string[]>)[field]?.map((opt) => (
                                                <label key={opt} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        checked={(form.watch(field as keyof CVFormValues) as string[]).includes(opt)}
                                                        onCheckedChange={() => {
                                                            const current = form.getValues(field as keyof CVFormValues) as string[];
                                                            form.setValue(
                                                                field as keyof CVFormValues,
                                                                current.includes(opt) ? current.filter(v => v !== opt) : [...current, opt]
                                                            );
                                                        }}
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                {/* Colonne droite - aperçu CV */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={handlePrint}>
                            <Printer className="w-4 h-4" />
                            Télécharger en PDF
                        </Button>
                    </div>
                    <div
                        ref={printRef}
                        className="border rounded-md p-8 bg-white shadow-md space-y-8 font-sans w-full"
                    >
                        <div className="flex justify-between items-center border-b pb-6 mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {form.watch("firstname")} {form.watch("lastname")}
                                </h1>
                                {form.watch("title") && (
                                    <p className="text-gray-600 mt-1">{form.watch("title")}</p>
                                )}
                            </div>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Avatar"
                                    className="w-24 h-24 object-cover rounded-full border shadow"
                                />
                            )}
                        </div>

                        {(["summary", "experience", "education", "skills", "project", "interest"] as const).map((field) => {
                            const values = form.watch(field);
                            if (!values || (Array.isArray(values) && values.length === 0)) return null;

                            const sectionTitles: Record<string, string> = {
                                summary: "Profil professionnel",
                                experience: "Expérience professionnelle",
                                education: "Formation",
                                skills: "Compétences",
                                project: "Projets réalisés",
                                interest: "Centres d'intérêt",
                            };

                            return (
                                <div key={field}>
                                    <h2 className="text-lg font-semibold text-gray-700 border-b mb-2 pb-1 uppercase">
                                        {sectionTitles[field]}
                                    </h2>
                                    {Array.isArray(values) ? (
                                        <ul className="list-disc list-inside text-gray-800 text-sm space-y-1">
                                            {values.map((val: string) => (
                                                <li key={val}>{val}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{values}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </form>
        </Form>
    );
};