import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";

export const FiltersAccordion = () => (
    <div>
    <Accordion type="multiple" className="space-y-2 ">
        {/* 1) Type de contrat */}
        <AccordionItem value="type-contrat">
            <AccordionTrigger>Type de contrat</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cdi" />
                        <Label htmlFor="cdi">CDI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="cdd" />
                        <Label htmlFor="cdd">CDD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="autre" />
                        <Label htmlFor="autre">Autre</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 2) Niveau d’expérience */}
        <AccordionItem value="experience">
            <AccordionTrigger>Niveau d’expérience</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="junior" />
                        <Label htmlFor="junior">Junior</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="intermediaire" />
                        <Label htmlFor="intermediaire">Intermédiaire</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="senior" />
                        <Label htmlFor="senior">Senior</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 3) Temps de travail */}
        <AccordionItem value="temps-travail">
            <AccordionTrigger>Temps de travail</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="temps-plein" />
                        <Label htmlFor="temps-plein">Temps plein</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="temps-partiel" />
                        <Label htmlFor="temps-partiel">Temps partiel</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>

        {/* 4) Mode de travail */}
        <AccordionItem value="mode-travail">
            <AccordionTrigger>Mode de travail</AccordionTrigger>
            <AccordionContent>
                <div className="mt-2 space-y-2 ml-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remote" />
                        <Label htmlFor="remote">Télétravail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="onsite" />
                        <Label htmlFor="onsite">Sur site</Label>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    </div>
)