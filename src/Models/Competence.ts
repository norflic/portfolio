export type CompetenceProject = {
  name: string;
  isEntreprise?: boolean;
};

export type CompetenceLevel = {
  num: string;
  title: string;
  ac: string[];
  projects: CompetenceProject[];
};

export type Competence = {
  id: string;
  nom: string;
  code: string;
  def: string;
  niveaux: CompetenceLevel[];
};

export const competencesData: Competence[] = [
  {
    id: "realiser",
    nom: "Réaliser",
    code: "CE1",
    def: "Développer - concevoir, coder, tester - et intégrer une solution informatique pour un client, en respectant les besoins exprimés, en appliquant les principes algorithmiques, en veillant à la qualité du code et de sa documentation, et en choisissant les ressources techniques appropriées.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Développer des applications informatiques simples",
        ac: [
          "Implémenter et élaborer des conceptions simples",
          "Évaluer des essais au regard des spécifications",
          "Développer des interfaces utilisateurs",
        ],
        projects: [{ name: "Moove green" }, { name: "Snake" }],
      },
      {
        num: "Niveau 2",
        title: "Partir des exigences et aller jusqu'à une application complète",
        ac: [
          "Élaborer les spécifications fonctionnelles et non fonctionnelles",
          "Appliquer les principes d'accessibilité et d'ergonomie",
          "Vérifier et valider la qualité par les tests",
        ],
        projects: [{ name: "Blog Symfony" }, { name: "Challenger" }],
      },
      {
        num: "Niveau 3",
        title: "Adapter des applications sur un ensemble de supports",
        ac: [
          "Choisir et implémenter les architectures adaptées",
          "Faire évoluer une application existante",
          "Intégrer des solutions dans un environnement de production",
        ],
        projects: [
          { name: "Application de livraison" },
        ],
      },
    ],
  },
  {
    id: "optimiser",
    nom: "Optimiser",
    code: "CE2",
    def: "Proposer des applications informatiques optimisées selon des critères spécifiques - temps d'exécution, précision, consommation de ressources - en formalisant des situations complexes, en s'appuyant sur des algorithmes et structures de données usuels, et en justifiant les choix effectués.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Appréhender et construire des algorithmes",
        ac: [
          "Analyser un problème avec méthode",
          "Comparer des algorithmes pour des problèmes classiques",
          "Formaliser des outils mathématiques pour l'informatique",
        ],
        projects: [{ name: "Tours d'Hanoï" }],
      },
      {
        num: "Niveau 2",
        title: "Sélectionner les algorithmes adéquats pour répondre à un problème donné",
        ac: [
          "Choisir des structures de données complexes adaptées",
          "Utiliser des techniques algorithmiques adaptées",
          "Comprendre les enjeux de sécurisation des données et du code",
        ],
        projects: [{ name: "SAE Gestion d'un espace aérien" }],
      },
      {
        num: "Niveau 3",
        title: "Analyser et optimiser des applications",
        ac: [
          "Anticiper les résultats de métriques (temps, mémoire, montée en charge)",
          "Profiler et justifier le comportement d'un code existant",
        ],
        projects: [{ name: "SAE Gestion d'un espace aérien" }],
      },
    ],
  },
  {
    id: "administrer",
    nom: "Administrer",
    code: "CE3",
    def: "Installer, configurer, mettre à disposition et maintenir en conditions opérationnelles des infrastructures, des services et des réseaux, en sécurisant le système d'information et en appliquant les normes et bonnes pratiques architecturales et de sécurité.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Installer et configurer un poste de travail",
        ac: [
          "Identifier les composants matériels et logiciels d'un système",
          "Installer et configurer un système d'exploitation et des outils de développement",
          "Configurer un poste dans un réseau d'entreprise",
        ],
        projects: [{ name: "Portfolio" }],
      },
      {
        num: "Niveau 2",
        title: "Déployer des services dans une architecture réseau",
        ac: [
          "Concevoir et développer des applications communicantes",
          "Utiliser des serveurs et services réseau virtualisés",
          "Sécuriser les services et données d'un système",
        ],
        projects: [{ name: "Portfolio" }],
      },
    ],
  },
  {
    id: "gerer",
    nom: "Gérer",
    code: "CE4",
    def: "Concevoir, gérer, administrer et exploiter les données de l'entreprise, et mettre à disposition les informations nécessaires à son pilotage, en respectant les réglementations sur la protection des données et en assurant la cohérence et la qualité de l'information.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Concevoir et mettre en place une base de données à partir d'un cahier des charges",
        ac: [
          "Mettre à jour et interroger une base de données relationnelle",
          "Visualiser des données",
          "Concevoir une base de données à partir d'un cahier des charges",
        ],
        projects: [
          { name: "Catalogue interractif (Acial)", isEntreprise: true },
          { name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true },
        ],      },
      {
        num: "Niveau 2",
        title: "Optimiser une base de données, interagir avec une application et mettre en oeuvre la sécurité",
        ac: [
          "Optimiser les modèles de données",
          "Assurer la sécurité des données (intégrité, confidentialité)",
          "Organiser la restitution de données à travers la programmation",
        ],
        projects: [
          { name: "Catalogue interractif (Acial)", isEntreprise: true },
          { name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true },
        ],
      },
    ],
  },
  {
    id: "conduire",
    nom: "Conduire",
    code: "CE5",
    def: "Satisfaire les besoins des utilisateurs au regard de la chaîne de valeur du client, organiser et piloter un projet informatique avec des méthodes classiques ou agiles, en communiquant efficacement avec les différents acteurs du projet.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Identifier les besoins métiers des clients et des utilisateurs",
        ac: [
          "Appréhender les besoins du client et de l'utilisateur",
          "Mettre en place les outils de gestion de projet",
          "Identifier les acteurs et phases d'un cycle de développement",
        ],
        projects: [
          { name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true },
        ],
      },
      {
        num: "Niveau 2",
        title: "Appliquer une démarche de suivi de projet en fonction des besoins métiers",
        ac: [
          "Identifier les processus d'une organisation pour améliorer les systèmes d'information",
          "Définir et mettre en oeuvre une démarche de suivi de projet",
        ],
        projects: [
          { name: "Challenger" },
          { name: "Catalogue interractif (Acial)", isEntreprise: true },
          { name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true },
        ],
      },
    ],
  },
  {
    id: "collaborer",
    nom: "Collaborer",
    code: "CE6",
    def: "Acquérir, développer et exploiter les aptitudes nécessaires pour travailler efficacement dans une équipe informatique, en s'inscrivant dans une démarche pluridisciplinaire et en développant une communication efficace et collaborative.",
    niveaux: [
      {
        num: "Niveau 1",
        title: "Identifier ses aptitudes pour travailler dans une équipe",
        ac: [
          "Appréhender l'écosystème numérique",
          "Identifier les statuts, fonctions et rôles au sein d'une équipe pluridisciplinaire",
          "Acquérir les compétences interpersonnelles pour travailler en équipe",
        ],
        projects: [{ name: "Challenger" }, { name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true }],
      },
      {
        num: "Niveau 2",
        title: "Situer son rôle et ses missions au sein d'une équipe informatique",
        ac: [
          "Comprendre la structure de l'informatique dans une organisation",
          "Mobiliser les compétences interpersonnelles en équipe",
          "Rendre compte de son activité professionnelle",
        ],
        projects: [{ name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true }],
      },
      {
        num: "Niveau 3",
        title: "Manager une équipe informatique",
        ac: [
          "Organiser et partager une veille technologique",
          "Guider la conduite du changement informatique",
        ],
        projects: [{ name: "Fiches d'administrations MAP (Cellance)", isEntreprise: true }],
      },
    ],
  },
];

