import axios from "axios";

interface UserPayload {
  name: string;
  email: string;
  telephone?: string;
  adresse?: string;
}

interface ResponseData {
  message: string;
  user: any;
}

const BASE_URL = 'http://localhost:3000/users'; // URL de l'API simulant la base de données

/**
 * API pour signin.
 * Vérifie si l'utilisateur existe déjà en effectuant une requête GET sur l'API.
 * S'il n'existe pas, il est créé via une requête POST.
 */
export async function signin(payload: UserPayload): Promise<ResponseData> {
  try {
    // Vérification de l'existence de l'utilisateur par email
    const { data: existingUsers } = await axios.get(BASE_URL, {
      params: { email: payload.email },
    });

    if (existingUsers && existingUsers.length > 0) {
      // L'utilisateur existe déjà
      return {
        message: "Utilisateur existe déjà",
        user: existingUsers[0],
      };
    } else {
      // Création d'un nouvel utilisateur
      const { data: newUser } = await axios.post(BASE_URL, payload);
      return {
        message: "Utilisateur créé avec succès",
        user: newUser,
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la connexion");
  }
}
