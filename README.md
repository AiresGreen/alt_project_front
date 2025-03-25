# BalanceTonJob.io – CRM de recherche d’emploi moderne

**BalanceTonJob.io** est une application web en React permettant aux utilisateurs de centraliser et structurer leur recherche d’emploi avec un CRM personnel intelligent et personnalisable.

---

## 🎯 Objectif

Ce projet vise à **faciliter la gestion de candidatures** grâce à un outil interactif de création de CV, suivi des offres, préparation aux entretiens et communication avec les recruteurs.

---

## ⚙️ Technologies utilisées

- **Frontend** : React 19, Vite, Tailwind CSS 4
- **Backend** : Node.js + Express
- **Auth** : Next-Auth avec JWT
- **Formulaires** : React Hook Form, Formik, Yup, Zod
- **API** : Axios + TanStack Query
- **Base de données** : MySQL (via Workbench)
- **Design** : Figma, Radix UI, Lucide React
- **Tests** : Cypress
- **Versioning / Outils** : GitLab, YouTrack

---

## 🏗️ Architecture

Le projet est conçu en **architecture microservices** :
- Frontend (React) communique avec un backend Express
- Authentification gérée via Next-Auth
- Chaque domaine métier est séparé en services spécialisés
- Base de données unique centralisée (MySQL)

![Architecture](./Architecture_BalanceTonJob.png)

## 👨‍💻 Auteurs
Jean-Mathieu Amblard

Vladislav Kunitsyn

Projet réalisé dans le cadre de la formation CDA (ALT/).

---

## 🚀 Lancer le projet en local

```bash
# Installer les dépendances
npm install

# Lancer le frontend en mode dev
npm run dev

# Lancer les tests end-to-end
npm run cypress


