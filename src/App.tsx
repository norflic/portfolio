import Header from "./Components/Header";
import MaPage from "./Components/MaPage";
import Projets from "./Components/Projets";
import Stats from "./Components/stats/Stats";
import {useEffect, useRef, useState} from "react";
import {ProjectCategory, Projects} from "./Models/Project";
import {LINK_STATUS_UPDATE_EVENT, LinkStatusUpdateDetail, updateProjectsLinksStatus} from "./utils/linkUtils.ts";

function App() {
    const preloadedImagesRef = useRef<Set<string>>(new Set());

    const initialProjects: Projects = {
        web: {
            title: "Web",
            projects: [
            {
                title: "Moove green",
                image: "/portfolio/projects_img/moove_green.png",
                listeLiens: [
                    {
                        lien: "https://sae105.portfolio.a4r.fr",
                        nomLien: "Site Moove green",
                        status: "unchecked"
                    },
                    {
                        lien: "http://p2301438.pages.univ-lyon1.fr/sae-1.05-recueil-des-besoins/",
                        nomLien: "Site Moove green",
                        status: "unchecked"
                    }

                ],
                note: 4,
                description:
                    "Nous devions faire un site web sans contrainte principale mais nous étions limités car nous n'avions pas encore étudié le JS. Nous avons tout de même réussi à afficher un bandeau déroulant avec uniquement du HTML et CSS.",
                data: {
                    time: 10,
                },
            },
            {
                title: "Challenger",
                image: "/portfolio/projects_img/challenger_main_menu.png",
                listeLiens: [
                    {
                        lien: "https://challenger.portfolio.a4r.fr",
                        nomLien: "Site Challenger",
                        status: "unchecked"
                    },
                    {
                        lien: "https://challenger.host/",
                        nomLien: "Site en Challenger",
                        status: "unchecked"
                    }

                ],
                description:
                    "Ce site est le résultat d'un an de travail. Il a été fait en React. L'objectif était de permettre à des joueurs de basket de s'organiser pour se retrouver sur un terrain et échanger entre eux.",
                note: 3,
                data: {
                    time: 80,
                },
            },
            {
                title: "Blog Symfony",
                image: "/portfolio/projects_img/blog_symfony.png",
                listeLiens: [
                    {
                        lien: "https://tp-symfo.portfolio.a4r.fr",
                        nomLien: "Site Blog Symfony",
                        status: "unchecked"
                    }],
                description:
                    "Ce site a été le premier à être réalisé à l'aide de symfony et ça ne sera certainement pas le dernier. Il est l'un des projets les plus complets, de part son style graphique très travaillé et par le temps passé.",
                note: 5,
                data: {
                    time: 15,
                },
            }
        ],
        },
        applications: {
            title: "Applications",
            projects: [
            {
                title: "SAE Gestion d'un espace aérien",
                image: "/portfolio/projects_img/sae_aeroport.png",
                listeLiens: [],
                description:
                    "Dans ce projet, nous devions, à partir de fichiers contenant des données de vols, les afficher et les traiter en appliquant le meilleur algorithme possible.",
                note: 3,
                data: {
                    time: 50,
                },
            },
            {
                title: "Snake",
                image: "/portfolio/projects_img/snake.png",
                listeLiens: [],
                description:
                    "Pour un projet libre en anglais, nous avons eu l'idée de créer des mini-jeux et de les rassembler en un projet. Les autres projets sont un brick-breaker, un pacman et un bomberman.",
                note: 5,
                data: {
                    time: 50,
                },
            },
            {
                title: "Tours d'Hanoï",
                image: "/portfolio/projects_img/tours_hanoi.png",
                listeLiens: [],
                description:
                    "Pour un projet de qualité dev, nous devions utiliser des structures de données vues en cours et nous avons créé ce mini-jeu inspiré du casse tête des tours d'hanoï",
                note: 5,
                data: {
                    time: 50,
                },
            },
        ],
        },
        projetsPersos: {
            title: "Projets persos",
            projects: [
            {
                title: "Site de plongée sous-marine",
                image: "",
                listeLiens: [],
                description:
                    "Ce site m'a été demandé par un proche. Je l'ai fait avec plaisir pour participer à la vie associative du club de plongée d'Agay. L'objectif de ce site était de permettre une meilleure administration des papiers des plongeurs par le directeur de plongée.",
                note: 4,
                data: {
                    time: 25,
                },
            },
            {
                title: "Portfolio",
                image: "/portfolio/projects_img/portfolio.png",
                listeLiens: [],
                description:
                    "La réalisation de ce portfolio me permet de me présenter, de mettre en valeur le travail réalisé pendant ma scolarité et enfin, de présenter les projets personnels que j'ai pu mettre en place. Ce portfolio pourra être un support pour des employeurs ou encore dans ma démarche de recherche d'apprentissage.",
                note: 4,
                data: {
                    time: 30,
                },
            },
        ],
        },
        mobile: {
            title: "Mobile",
            projects: [
            {
                title: "Application de livraison",
                image: "/portfolio/projects_img/kotlin.png",
                listeLiens: [],
                description:
                    "Cette application de livraison a été mon premier projet sur Kotlin. Je me suis beaucoup investi, ce qui m'a permit de rapidement maîtriser les bases de ce langage.",
                note: 5,
                data: {
                    time: 30,
                },
            },
        ],
        },
        entreprise: {
            title: "Entreprise",
            projects: [
                {
                    title: "Catalogue interractif (Acial)",
                    image: "/portfolio/projects_img/catalogue.png",
                    listeLiens: [{
                        lien: "https://customers.acial.com/catalogue/matrice/catalogue",
                        nomLien: "Catalogue en ligne",
                        status: "unchecked"
                    }],
                    description:
                        "Ce site est le premier réalisé en entreprise. Il contient un catalogue interractif, un configurateur de produits, ainsi qu'une page pour créer des devis de manière simplifiée. Ce projet a été réalisé seul, de la conception de la base de données à la mise en production.",
                    note: 5,
                    data: {
                        time: 330,
                    },
                },
                {
                    title: "Fiches d'administrations MAP (Cellance)",
                    image: "/portfolio/projects_img/subvention-valeur-base.png",
                    listeLiens: [
                        {
                            lien: "https://www.mapbycellance.com/",
                            nomLien: "présentation de MAP",
                            status: "unchecked"
                        }
                    ],
                    description:
                        "J'ai développé de nombreuses pages d'administrations pour l'entreprise Cellance. Le projet sur lequel j'ai travaillé est MAP, qui contient 5 développeurs. Pendant ce stage, j'ai apprit à utiliser cursor, l'IA et à travailler en équipe.",
                    note: 5,
                    data: {
                        time: 400,
                    },
                },
                ],
        },

    };
    const [projects, setProjects] = useState<Projects>(initialProjects);
    const [selectedCategorie, setSelectedCategorie] = useState<ProjectCategory>(ProjectCategory.Web);
    const selectedProjects = projects[selectedCategorie].projects;

    useEffect(() => {
        const handleLinkStatusUpdate = (event: Event) => {
            console.log("réponse recue")
            const customEvent = event as CustomEvent<LinkStatusUpdateDetail>;
            const {category, projectIndex, linkIndex, status} = customEvent.detail;

            setProjects((prev) => {
                const section = prev[category];
                const project = section.projects[projectIndex];
                const linkItem = project?.listeLiens?.[linkIndex];

                if (!project || !linkItem || linkItem.status === status) {
                    return prev;
                }

                const updatedLinks = [...project.listeLiens];
                updatedLinks[linkIndex] = {
                    ...linkItem,
                    status,
                };

                const updatedCategoryProjects = [...section.projects];
                updatedCategoryProjects[projectIndex] = {
                    ...project,
                    listeLiens: updatedLinks,
                };

                return {
                    ...prev,
                    [category]: {
                        ...section,
                        projects: updatedCategoryProjects,
                    },
                };
            });
        };

        window.addEventListener(LINK_STATUS_UPDATE_EVENT, handleLinkStatusUpdate as EventListener);
        void updateProjectsLinksStatus(initialProjects);

        return () => {
            window.removeEventListener(LINK_STATUS_UPDATE_EVENT, handleLinkStatusUpdate as EventListener);
        };
    }, []);

    useEffect(() => {
        const preload = (src: string) => {
            if (!src || preloadedImagesRef.current.has(src)) return;

            const image = new Image();
            image.src = src;
            preloadedImagesRef.current.add(src);
        };

        const currentCategoryImages = projects[selectedCategorie].projects.map((project) => project.image);
        const allImages = Object.values(projects).flatMap((section) =>
            section.projects.map((project) => project.image)
        );

        const uniqueCurrentImages = Array.from(new Set(currentCategoryImages));
        const uniqueOtherImages = Array.from(
            new Set(allImages.filter((src) => !uniqueCurrentImages.includes(src)))
        );

        // Prioritize images for the currently visible category.
        uniqueCurrentImages.forEach(preload);

        const delayedTimers: number[] = [];
        const backgroundStartTimer = window.setTimeout(() => {
            uniqueOtherImages.forEach((src, index) => {
                const timerId = window.setTimeout(() => preload(src), index * 120);
                delayedTimers.push(timerId);
            });
        }, 250);

        return () => {
            window.clearTimeout(backgroundStartTimer);
            delayedTimers.forEach((timerId) => window.clearTimeout(timerId));
        };
    }, [selectedCategorie]);

    return (
        <>
            <Header
                projects={projects}
                selectedCategory={selectedCategorie}
                onSelectCategory={setSelectedCategorie}
            />
            <div className=" bg-[url('/portfolio/projects_img/test.avif')] bg-cover bg-center bg-no-repeat">
                <div>
                    <MaPage></MaPage>
                </div>

                <div id="conteneurProjets">
                    <Projets selectedProjects={selectedProjects}/>
                </div>
                <Stats selectedProjects={selectedProjects} selectedCategorie={selectedCategorie}/>
            </div>

        </>
    )
}

export default App
