import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"], // Sélectionne les graisses de police nécessaires
  variable: "--font-nunito" // Définit une variable CSS utilisable partout
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={nunito.variable}>{children}</div>;
}