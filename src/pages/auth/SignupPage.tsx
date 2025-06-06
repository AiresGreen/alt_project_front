import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/hook/contexts/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {signup} from "@/services/api/authApi.ts";
import {useNavigate} from "react-router-dom";




const formSchema = z
    .object({
        firstname: z.string().nonempty("Le prénom doit être présent"),
        lastname: z.string().nonempty("Le nom est nécessaire"),
        email: z
            .string()
            .nonempty("L'e-mail est essentiel")
            .email("Votre Email est non valide"),
        password: z
            .string()
            .min(8, "Le mot de passe doit avoir au moins 8 caractères")
            .refine((password) => /[A-Z]/.test(password), {
                message: "Le Mot de Passe doit contenir au moins une majuscule",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Le Mot de Passe doit contenir au moins une minuscule",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Le Mot de Passe doit contenir au moins un chiffre",
            })
            .refine(
                (password) =>
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
                {
                    message:
                        "Le mot de Passe doit contenir au moins un caractère spécial",
                }
            ),
        passwordconfirmation: z.string().nonempty("Ce champ est requis"),
    })
    .refine((data) => data.password === data.passwordconfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordconfirmation"],
    });

export const SignupPage = () => {
    const { updateAuthentication } = useContext(AuthContext);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();

    function onSubmit(values: z.infer<typeof formSchema>) {

        console.log(values);
        console.log("click");

        signup(values)
            .then((user:any) => {
                if (user.emailVerified) {
                    updateAuthentication(true, user);
                } else {
                    updateAuthentication(false, user);
                    navigate("/verification-en-attente");
                }
            })
            .catch((err:any) =>
                form.setError("email", { message: err || "Inscription échouée" })
            );
    }

    return (
        <>
            <div className="m-8 rounded-xl ">
                <h1 className="font-[var(--font-nunito)] text-center text-3xl md:text-6xl text-transparent bord ">
                    {" "}
                    INSCRIPTION{" "}
                </h1>
            </div>
            <div className="rounded-xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" md:space-y-8 flex flex-col p-4 md:p-12 md:gap-8 gap-8 "
                    >
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Votre nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Malkovitch"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="john@malkovitch.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de Passe</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Mot de Passe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordconfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {" "}
                                        Confirmation Mot de Passe
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirmation"
                                            {...field} value={field.value ?? ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4 max-md:my-8">
                            <Button type="submit">
                                Créer le profil
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-{200.1px}"
                            >
                                Annuler
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};
