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

const formSchema = z
    .object({
        username: z.string().nonempty("Le prénom doit être présent"),
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

export const SigninPage = () => {
    const { updateAuthentication } = useContext(AuthContext);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            lastname: "",
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        console.log("click");
        updateAuthentication(true);
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
                        className="md:space-y-8 flex flex-col p-4 md:p-12 md:gap-8 gap-8 "
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prénom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
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
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4 max-md:my-8">
                            <Button type="submit">
                                Vers l'infini et au dela
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                    />
                                </svg>
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
