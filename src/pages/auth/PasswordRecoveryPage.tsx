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
        username: z.string().min(2).max(50),
        lastname: z.string().min(2).max(50),
        email: z.string().min(2).email(),
        password: z
            .string()
            .min(8)
            .refine((password) => /[A-Z]/.test(password), {
                message: "Password must contain at least one uppercase letter",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Password must contain at least one lowercase letter",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Password must contain at least one digit",
            })
            .refine(
                (password) =>
                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
                {
                    message:
                        "Password must contain at least one special character",
                }
            ),
        passwordconfirmation: z.string(),
    })
    .refine((data) => data.password === data.passwordconfirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["passwordconfirmation"],
    });

export const PasswordRecoveryPage = () => {
    const { updateAuthentication } = useContext(AuthContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            passwordconfirmation: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        updateAuthentication(true);
    }

    return (
        <>
            <div className=" md:m-20 m-8">
                <h1 className="font-[var(--font-nunito)] text-center text-3xl md:text-6xl text-transparent bord ">
                    {" "}
                    Récuperation du mot de passe{" "}
                </h1>
            </div>
            <div className="rounded-xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="md:space-y-8 flex flex-col p-4 md:p-12 md:gap-12 gap-8 "
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nouveau Mot de Passe</FormLabel>
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
                                        Confirmer le Mot de Passe
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
                            <Button>
                                Cool!
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
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};
