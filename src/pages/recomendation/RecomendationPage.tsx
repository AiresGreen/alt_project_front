"use client";

import { useMediaQuery } from "@/lib/useMediaQuery";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/BackButton/BackButton.tsx";
import { useQuery } from "@tanstack/react-query";
import { getAllRecommendation } from "@/services/api/recommendation";

export default function MesRecommandations() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
}

// ---------- Layout mobile ----------
function MobileLayout() {
  const { data } = useQuery<any[]>({
    queryKey: ["getAllRecommendations"],
    queryFn: () => getAllRecommendation(),
    staleTime: 0
  });
  console.log("🏀🍗🦖 ~ MobileLayout ~ data:", data);

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header mobile */}
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Liste de recommandation</h1>
        <Button>+ Reco</Button>
        <BackButton />
      </header>

      {/* Liste des recommandations avec ScrollArea */}
      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-4">
          {data?.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{value.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{value.companyInfos.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Separator className="my-2" />

      {/* Navigation bas de page */}
      <nav className="flex justify-around">
        <Button variant="ghost">Mon emploi</Button>
        <Button variant="ghost">Mes candidatures</Button>
        <Button variant="ghost">Mon carnet de contacts</Button>
      </nav>
    </div>
  );
}

// ---------- Layout desktop ----------
function DesktopLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header desktop */}
      <header className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Liste de recommandation</h1>
        <div className="space-x-2">
          <Button>GET recommendation</Button>
          <Button>Créer le CV</Button>
          <BackButton />
        </div>
      </header>

      {/* Corps principal : sidebar + contenu */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r p-4">
          <nav className="space-y-2 text-gray-700">
            <Button variant="ghost" className="w-full justify-start">
              Tata (Entreprise)
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Titi (Entreprise)
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Tota (Entreprise)
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Ta proposition
            </Button>
          </nav>
        </aside>

        {/* Liste des recommandations en grille */}
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>Reco #{i + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Contenu de la recommandation #{i + 1}…</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
