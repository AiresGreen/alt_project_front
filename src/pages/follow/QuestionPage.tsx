import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useState, SetStateAction } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaPenFancy } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";
import { BackButton } from "@/components/BackButton/BackButton.tsx";

export default function QuestionPage() {
  const [reasons, setReasons] = useState({
    manqueCompetences: false,
    manqueExperience: false,
    inadEquation: false,
    autre: false
  });

  const [reasonsEnum, setReasonsEnum] = useState([
    {
      field: "Manque de compétences (soft skills, techniques)",
      value: 10
    },
    {
      field: "Manque d’expérience",
      value: 20
    },
    {
      field: "Inadéquation avec le poste / la culture d’entreprise",
      value: 30
    },
    {
      field: "Autre ",
      value: 40
    }
  ]);

  const [autreTexte, setAutreTexte] = useState("");
  const [exchangeCall, setExchangeCall] = useState("");

  // État pour la fenêtre de confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setReasons((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAutreTexteChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setAutreTexte(e.target.value);
  };

  const handleExchangeCallChange = (value: string) => {
    setExchangeCall(value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Raisons sélectionnées:", reasons);
    console.log("Autre (texte):", autreTexte);
    console.log("Échange téléphonique:", exchangeCall);

    // Au lieu d'alert(), on ouvre la fenêtre
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <Card className="bg-card-custom">
        <CardHeader>
          <CardTitle className="text-center">
            ENVOYER LA QUESTION SUR LES POINTS À AMÉLIORER ?
          </CardTitle>
          <Link to="/edit-questionner">
            <FaPenFancy className="text-black" />
          </Link>
          <CardDescription className="mt-2 text-sm text-black">
            OBJET : DEMANDE DE RETOUR SUR MA CANDIDATURE
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-gray-950">
            <p>Bonjour [Nom du recruteur],</p>
            <p>
              Suite à votre refus de ma candidature au poste de [Nom du poste]
              au sein de [Nom de la société], je me permets de vous solliciter
              afin de recueillir votre retour concernant mon profil.
              Pourriez-vous m’indiquer les raisons pour lesquelles ma
              candidature n’a pas été retenue ?
            </p>
            <p>
              Ce feedback m’aiderait à mieux comprendre sur quelles
              compétences/expériences je dois me concentrer pour développer mon
              profil et ainsi mieux répondre aux attentes du marché.
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Quelles compétences aurais-je pu mieux mettre en avant ?</li>
              <li>
                Qu’est-ce qui a manqué dans mon profil, mon expérience, ma
                lettre de motivation… ?
              </li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              {/* Manque de compétences */}
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="manqueCompetences"
                  checked={reasons.manqueCompetences}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("manqueCompetences", !!checked)
                  }
                  className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <MdCheckBox className="w-6 h-6 text-black" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="manqueCompetences" className="text-gray-950">
                  Manque de compétences (soft skills, techniques)
                </label>
              </div>

              {/* Manque d’expérience */}
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="manqueExperience"
                  checked={reasons.manqueExperience}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("manqueExperience", !!checked)
                  }
                  className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <MdCheckBox className="w-6 h-6 text-black" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="manqueExperience" className="text-gray-950">
                  Manque d’expérience
                </label>
              </div>

              {/* Inadéquation avec le poste */}
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="inadEquation"
                  checked={reasons.inadEquation}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("inadEquation", !!checked)
                  }
                  className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <MdCheckBox className="w-6 h-6 text-black" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="inadEquation" className="text-gray-950">
                  Inadéquation avec le poste / la culture d’entreprise
                </label>
              </div>

              {/* Autre */}
              <div className="flex items-center space-x-2">
                <Checkbox.Root
                  id="autre"
                  checked={reasons.autre}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("autre", !!checked)
                  }
                  className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center"
                >
                  <Checkbox.Indicator>
                    <MdCheckBox className="w-6 h-6 text-black" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="autre" className="text-gray-950">
                  Autre ?
                </label>
              </div>

              {reasons.autre && (
                <Textarea
                  placeholder="Précisez..."
                  value={autreTexte}
                  onChange={handleAutreTexteChange}
                  className="mt-1"
                />
              )}
            </div>

            <div>
              <p className="text-sm text-gray-950">
                Souhaitez-vous être rappelé pour échanger de vive voix sur ma
                candidature ?
              </p>
              <RadioGroup.Root
                className="mt-2 space-y-2"
                value={exchangeCall}
                onValueChange={handleExchangeCallChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroup.Item
                    id="oui"
                    value="oui"
                    className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-black" />
                  </RadioGroup.Item>
                  <label htmlFor="oui" className="text-gray-950">
                    Oui, j’aimerais en discuter
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroup.Item
                    id="non"
                    value="non"
                    className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center"
                  >
                    <RadioGroup.Indicator className="w-2 h-2 rounded-full bg-black" />
                  </RadioGroup.Item>
                  <label htmlFor="non" className="text-gray-950">
                    Non, il n’y aura pas d’opportunité correspondante
                  </label>
                </div>
              </RadioGroup.Root>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="submit" variant="default">
                ENVOYER
              </Button>
              <BackButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* MODAL DE CONFIRMATION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-72 p-6 rounded-md text-center">
            <p className="text-xl font-semibold text-black">
              VOTRE DEMANDE DE RETOUR A ÉTÉ ENVOYÉE.
            </p>
            <Button
              className="mt-4"
              onClick={() => setIsModalOpen(false)}
              variant="default"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
