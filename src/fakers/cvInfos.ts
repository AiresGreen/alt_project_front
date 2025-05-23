export const getFakeCv = () => {
    return {
        name: "John Malkovitch",
        title: "Développeur Full Stack",
        experience: [
            { company: "Tech Corp", role: "Développeur", years: 2 },
            { company: "Web Solutions", role: "Développeur Senior", years: 3 },
        ],
        education: [
            { institution: "Université de Technologie", degree: "Licence en Informatique", year: 2018 },
        ],
        skills: ["JavaScript", "TypeScript", "Node.js", "React"],
    };
};