import { Button } from "@/components/ui/button";
import {
    Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/hook/contexts/auth.context";
import { signin } from "@/services/api/authApi.ts";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "sonner";


type LoginForm = { email: string; password: string };

export const LoginPage = () => {
    const form = useForm<LoginForm>();
    const {  handleSubmit } = form;
    const navigate = useNavigate();
    const { updateAuthentication } = useContext(AuthContext);


    const onSubmit = async (values: LoginForm) => {
        try {
            const data = await signin(values);
            // data = { accessToken, refreshToken, user: { id, email, firstname, lastname } }

            // 1) Sauvegarder les tokens
            localStorage.setItem('access-token', data.accessToken);
            localStorage.setItem('refresh-token', data.refreshToken);

            // 2) Mettre à jour le contexte (qui va aussi écrire ‘user’ dans localStorage)
            updateAuthentication(true, data.user);

            // 3) Rediriger l’utilisateur vers la page Profil
            navigate('/profile');
        } catch (err: any) {
            toast.error(typeof err === 'string' ? err : 'Erreur de connexion');
        }
    };

  return (
    <>
      <div className=" md:m-20 m-8 rounded-xl">
        <h1 className="font-[var(--font-nunito)] text-center text-3xl md:text-6xl text-transparent bord ">
          {" "}
          CONNEXION{" "}
        </h1>
      </div>
      <div className="rounded-xl">
          <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:space-y-8 flex flex-col p-4 md:p-12 md:gap-12 gap-8 py-12"
          >
            <FormField
                control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de connexion</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@malkovitch.com"
                      {...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormField
                  control={form.control}
                name="password"
                render={({ field  }) => (
                  <FormItem>
                    <FormLabel>Mot de Passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mot de Passe"
                        {...field }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <NavLink to="/LoginRecoveryPage">Mot de passe Oublié</NavLink>
            </div>

            <div className="flex flex-col gap-4 max-md:my-8 py-20">
              <Button>
                {" "}
                {/* a modifier */}
                Connexion
              </Button>
              <Button variant="outline" className="w-{200.1px}">
                Annuler
              </Button>
            </div>
          </form>
          </Form>
      </div>
    </>
  );
};
