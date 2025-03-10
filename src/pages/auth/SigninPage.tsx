
  import { useState } from "react";
  import { LoginInterface } from "@/interface/LoginInterface";

  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

  import { zodResolver } from "@hookform/resolvers/zod"
  import { useForm } from "react-hook-form"
  import { z } from "zod"
  
//Regex qui va être appelé et servira pour valider le mot de passe
  const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    lastname:z.string().min(2).max(50),
    email:z.string().min(2).email(),
    password: z
    .string()
    .min(8)
    .refine((password) => /[A-Z]/.test(password), { message: "Password must contain at least one uppercase letter" })
    .refine((password) => /[a-z]/.test(password), { message: "Password must contain at least one lowercase letter" })
    .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one digit" })
    .refine((password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password), { message: "Password must contain at least one special character" })
    });
    
  



  export const SigninPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        lastname:"",
        email:"",
        password:"",
      },
    })
  
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
        console.log(values)
    }

      return (
  <>
          <img src="../public/logo.png" alt="Logo Balance ton job" className="h-50 m-auto"/>
          <div className="bg-green-300">
            
              <h1 className="font-[var(--font-nunito)] text-center text-6xl bg-gradient-to-r from-cyan-700 to-blue-950 bg-clip-text text-transparent bord "> INSCRIPTION </h1>


          </div>        
          <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input placeholder="Malkovitch" {...field} />
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
                  <Input type="email" placeholder="john@malkovitch.com" {...field} />
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
                  <Input type="password" placeholder="Mot de Passe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          

          <Button>Submit</Button>
        </form>
      </Form>
  </>
      );
  }