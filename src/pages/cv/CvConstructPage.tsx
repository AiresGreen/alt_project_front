import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useMediaQuery} from "@/lib/useMediaQuery";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form.tsx";


// Définition du schéma avec Zod
const cvSchema = z.object({
    firstname: z.string().nonempty("Le prénom est requis"),
    lastname: z.string().nonempty("Le nom est requis"),
    title: z.string().nonempty("Le titre est requis"),
    summary: z.string().nonempty("Le résumé est requis"),
    languages: z.string().nonempty("La langue est requise"),
    skills: z.string().nonempty("Une compétence est requise"),
});

type CVFormValues = z.infer<typeof cvSchema>;

export const CvConstructPage = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const form = useForm<z.infer<typeof cvSchema>>({
        resolver: zodResolver(cvSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            title: "",
            summary: "",
            languages: "",
            skills: "",
        },
    })


    const onSubmit = (values: CVFormValues) => {
        console.log("Form Data:", values);
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="p-4 gap-4">
                {isDesktop ? (
                    // Version Desktop
                    <Card className="w-full">
                        <CardContent className="p-4 grid grid-cols-2 gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Prénom</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Votre Prénom" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>NOM</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Votre NOM" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Titre de votre CV</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Titre de votre CV" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="summary"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Quelques mots sur vous" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>

                                {/*Select de Hook React Form*/}
                                <FormField
                                    control={form.control}
                                    name="languages"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Langues</FormLabel>
                                            <Controller
                                                control={form.control}
                                                name="languages"
                                                render={({field}) => (
                                                    <Select onValueChange={field.onChange}
                                                            defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Sélectionner votre langue(s)"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="fr">Français</SelectItem>
                                                            <SelectItem value="en">Anglais</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Compétences</FormLabel>
                                            <Controller
                                                control={form.control}
                                                name="skills"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange}
                                                            defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Sélectionner vos compétences"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="comm">Communication</SelectItem>
                                                            <SelectItem value="it">Informatique</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit"
                                        className="mt-2">
                                    Sauvegarder et générer
                                </Button>
                                <Button variant="outline"
                                        className="mt-2">
                                    Postuler
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    /* Version Mobile */

                    <Card className="w-full">
                    <CardContent className="p-4">
                    <div>
                    <FormField
                    control={form.control}
                  name="firstname"
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                              <Input placeholder="Votre Prénom" {...field} />
                          </FormControl>
                          <FormMessage/>
                      </FormItem>
                  )}
            />
            <FormField
                control={form.control}
                name="lastname"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>NOM</FormLabel>
                        <FormControl>
                            <Input placeholder="Votre NOM" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Titre de votre CV</FormLabel>
                        <FormControl>
                            <Input placeholder="Titre de votre CV" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="summary"
                render={({field}) => (
                    <FormItem>
                        <FormLabel></FormLabel>
                        <FormControl>
                            <Textarea placeholder="Quelques mots sur vous" {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    <div>

        {/*Select de Hook React Form*/}
        <FormField
            control={form.control}
            name="languages"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Langues</FormLabel>
                    <Controller
                        control={form.control}
                        name="languages"
                        render={({field}) => (
                            <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sélectionner votre langue(s)"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="en">Anglais</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <FormMessage/>
                </FormItem>
            )}
        />

        <FormField
            control={form.control}
            name="skills"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Compétences</FormLabel>
                    <Controller
                        control={form.control}
                        name="skills"
                        render={({field}) => (
                            <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sélectionner vos compétences"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="comm">Communication</SelectItem>
                                    <SelectItem value="it">Informatique</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <FormMessage/>
                </FormItem>
            )}
        />
        <Button type="submit"
                className="mt-2">
            Sauvegarder et générer
        </Button>
        <Button variant="outline"
                className="mt-2">
            Postuler
        </Button>
    </div>
</CardContent>
</Card>
)}
</form>
</Form>
)
    ;
};

