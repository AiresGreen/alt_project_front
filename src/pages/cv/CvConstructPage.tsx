import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Le prénom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    title: Yup.string().required("Le titre est requis"),
    summary: Yup.string().required("Le résumé est requis"),
    languages: Yup.string().required("La langue est requise"),
    skills: Yup.string().required("Une compétence est requise"),
});

const CVBuilder = () => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            title: "",
            summary: "",
            languages: "",
            skills: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("Form Data:", values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col md:flex-row p-4 gap-4">
            {/* Mobile Version */}
            <Card className="w-full md:hidden">
                <CardContent className="p-4">
                    <Input name="firstName" placeholder="Prénom" onChange={formik.handleChange} value={formik.values.firstName} />
                    {formik.errors.firstName && <p className="text-red-500">{formik.errors.firstName}</p>}
                    <Input name="lastName" placeholder="Nom" onChange={formik.handleChange} value={formik.values.lastName} />
                    {formik.errors.lastName && <p className="text-red-500">{formik.errors.lastName}</p>}
                    <Input name="title" placeholder="Titre de votre CV" onChange={formik.handleChange} value={formik.values.title} />
                    {formik.errors.title && <p className="text-red-500">{formik.errors.title}</p>}
                    <Textarea name="summary" placeholder="Quelques mots sur vous" onChange={formik.handleChange} value={formik.values.summary} />
                    {formik.errors.summary && <p className="text-red-500">{formik.errors.summary}</p>}
                    <Select name="languages" onChange={formik.handleChange} value={formik.values.languages}>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">Anglais</SelectItem>
                    </Select>
                    {formik.errors.languages && <p className="text-red-500">{formik.errors.languages}</p>}
                    <Select name="skills" onChange={formik.handleChange} value={formik.values.skills}>
                        <SelectItem value="comm">Communication</SelectItem>
                        <SelectItem value="it">Informatique</SelectItem>
                    </Select>
                    {formik.errors.skills && <p className="text-red-500">{formik.errors.skills}</p>}
                    <Button type="submit" className="mt-2">Sauvegarder et générer</Button>
                    <Button variant="outline" className="mt-2">Postuler</Button>
                </CardContent>
            </Card>

            {/* PC Version */}
            <Card className="hidden md:block w-full">
                <CardContent className="p-4 grid grid-cols-2 gap-4">
                    <div>
                        <Input name="firstName" placeholder="Prénom" onChange={formik.handleChange} value={formik.values.firstName} />
                        {formik.errors.firstName && <p className="text-red-500">{formik.errors.firstName}</p>}
                        <Input name="lastName" placeholder="Nom" onChange={formik.handleChange} value={formik.values.lastName} />
                        {formik.errors.lastName && <p className="text-red-500">{formik.errors.lastName}</p>}
                        <Input name="title" placeholder="Titre de votre CV" onChange={formik.handleChange} value={formik.values.title} />
                        {formik.errors.title && <p className="text-red-500">{formik.errors.title}</p>}
                        <Textarea name="summary" placeholder="Quelques mots sur vous" onChange={formik.handleChange} value={formik.values.summary} />
                        {formik.errors.summary && <p className="text-red-500">{formik.errors.summary}</p>}
                    </div>
                    <div>
                        <Select name="languages" onChange={formik.handleChange} value={formik.values.languages}>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">Anglais</SelectItem>
                        </Select>
                        {formik.errors.languages && <p className="text-red-500">{formik.errors.languages}</p>}
                        <Select name="skills" onChange={formik.handleChange} value={formik.values.skills}>
                            <SelectItem value="comm">Communication</SelectItem>
                            <SelectItem value="it">Informatique</SelectItem>
                        </Select>
                        {formik.errors.skills && <p className="text-red-500">{formik.errors.skills}</p>}
                        <Button type="submit" className="mt-2">Sauvegarder et générer</Button>
                        <Button variant="outline" className="mt-2">Postuler</Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    );
};

export default CVBuilder;
