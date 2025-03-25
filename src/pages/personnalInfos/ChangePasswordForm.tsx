import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

// Schéma Zod de validation
const passwordSchema = z
    .object({
        ancien: z.string().min(6, "L'ancien mot de passe est requis"),
        nouveau: z
            .string()
            .min(8, "8 caractères minimum")
            .regex(/[A-Z]/, "Une majuscule requise")
            .regex(/[0-9]/, "Un chiffre requis")
            .regex(/[@$!%*?&#^+=_\-]/, "Un caractère spécial requis"),
        confirmation: z.string(),
    })
    .refine((data) => data.nouveau === data.confirmation, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmation"],
    })

type PasswordFormType = z.infer<typeof passwordSchema>

export default function ChangePasswordForm() {
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordFormType>({
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = ( ) => {

        toast.success("Mot de passe mis à jour avec succès", {
            description: "Votre nouveau mot de passe est actif.",
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md p-6 space-y-6 rounded-xl bg-card-custom shadow"
        >
            {/* Ancien mot de passe */}
            <div className="relative">
                <Label htmlFor="ancien">Ancien Mot de Passe</Label>
                <Input
                    type={showOld ? "text" : "password"}
                    id="ancien"
                    {...register("ancien")}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowOld((prev) => !prev)}
                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.ancien && <p className="text-red-500">{errors.ancien.message}</p>}
            </div>

            {/* Nouveau mot de passe */}
            <div className="relative">
                <Label htmlFor="nouveau">Nouveau mot de passe</Label>
                <Input
                    type={showNew ? "text" : "password"}
                    id="nouveau"
                    {...register("nouveau")}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowNew((prev) => !prev)}
                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.nouveau && <p className="text-red-500">{errors.nouveau.message}</p>}
                <ul className="text-sm text-gray-600 list-disc list-inside mt-2 space-y-1">
                    <li>8 caractères minimum</li>
                    <li>1 majuscule</li>
                    <li>1 chiffre</li>
                    <li>1 caractère spécial (@$!%*?...)</li>
                </ul>
            </div>

            {/* Confirmation */}
            <div className="relative">
                <Label htmlFor="confirmation">Confirmer le mot de passe</Label>
                <Input
                    type={showConfirm ? "text" : "password"}
                    id="confirmation"
                    {...register("confirmation")}
                    className="pr-10"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute right-2 top-8 text-gray-500 hover:text-gray-700"
                >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.confirmation && (
                    <p className="text-red-500">{errors.confirmation.message}</p>
                )}
            </div>

            <Button type="submit" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Modifier le mot de passe
            </Button>
        </form>
    )
}
