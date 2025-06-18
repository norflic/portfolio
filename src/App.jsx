import Header from "./Components/Header.jsx";
import MaPage from "./Components/MaPage.jsx";
import Projets from "./Components/Projets.jsx";
import Stats from "./Components/stats/Stats.jsx";
import {useEffect, useState} from "react";

function App() {
    const projects = {
        web: [
            {
                title: "Moove green",
                image: "/portfolio/projects_img/moove_green.png",
                lienSite: "http://p2301438.pages.univ-lyon1.fr/sae-1.05-recueil-des-besoins/",
                note:4,
                description:
                    "Nous devions faire un site web sans contrainte principales mais nous étions limités car nous n'avions pas encore étudié le JS. Nous avons tout de même réussi à afficher un bandeau déroulant avec uniquement du html et css.",
                data: {
                    time: 10,
                },
            },
            {
                title: "Challenger",
                image: "/portfolio/projects_img/challenger_main_menu.png",
                lienSite: "https://challenger.host/",
                // TODO : a la place, mettre un alert qui dit: ce site est en maintenance
                description:
                    "Ce site est le résultat d'un an de travail. Il a été fait en React. L'objectif était de permettre à des joueurs de basket de s'organiser pour se retrouver sur un terrain et échanger entre eux.",
                note:3,
                data: {
                    time: 80,
                },
            },
            {
                title: "Blog Symfony",
                image: "/portfolio/projects_img/image_indisponible.png",
                lienSite: "https://challenger.host/",
                // TODO : a la place, mettre un alert qui dit: ce site est en maintenance
                description:
                    "Ce site a été le premier à être réalisé à l'aide de symfony et ça ne sera certainement pas le dernier. Il est l'un des projets les plus complets, de part son style graphique très travaillé et pr le temps passé.",
                note:5,
                data: {
                    time: 15,
                },
            }
        ],
        applications : [
            {
                title: "SAE aéroport",
                image: "/portfolio/projects_img/sae_aeroport.png",
                description:
                    "Dans ce projet, nous devions, à partir de fichiers contenant des données de vols, afficher ces données et les traiter en appliquant le meilleur algorithme possible.",
                note:3,
                data: {
                    time: 50,
                },
            },
            {
                title: "Snake",
                image: "/portfolio/projects_img/snake.png",
                description:
                    "Pour un projet libre en anglais, nous avons eu l'idée de créer des minijeux et de les rassembler en un projet. Les autres projets sont un brickbreaker, un pacman et un bomberman",
                note:5,
                data: {
                    time: 50,
                },
            },
            {
                title: "Tours d'Hanoï",
                image: "/portfolio/projects_img/tours_hanoi.png",
                description:
                    "Pour un projet de qualité dev, nous devions utiliser des structures de données vues en cours et nous avons créé ce mini-jeu inspiré du casse tête des tours d'hanoï",
                note:5,
                data: {
                    time: 50,
                },
            },
        ],
        projetsPersos : [
            {
                title: "Site de plongée sous-marine",
                image: "/portfolio/projects_img/image_indisponible.png",
                description:
                    "Ce site m'a été demandé par un proche. Je l'ai fait avec plaisir pour participer à la vie associative du club de plongée d'Agay. L'objectif de ce site était de permettre une meilleure administration des papiers des plongeurs par le directeur de plongée",
                note:4,
                data: {
                    time: 25,
                },
            },
            {
                title: "Portfolio",
                image: "/portfolio/projects_img/portfolio.png",
                lienSite: "#",
                description:
                    "La réalisation de ce portfolio me permet de me présenter, de mettre en valeur le travail réalisé pendant ma scolarité et également de présenter les projets personnels que j'ai pu mettre en place. Ce portfolio pourra être un support pour des employeurs ou encore dans ma démarche de recherche d'apprentissage.",
                note:4,
                data: {
                    time: 30,
                },
            },
        ],
        mobile : [
            {
                title: "Application de livraison",
                image: "/portfolio/projects_img/kotlin.png",
                description:
                    "Cette application de Livraison a été mon premier projet sur Kotlin. Je me suis beaucoup inversi, ce qui m'a permit de rapidement maîtriser les bases de ce langage.",
                note:5,
                data: {
                    time: 30,
                },
            },
        ]

    };
    const [selectedProjects, setSelectedProjects] = useState(projects.web);
    const getCategorieFromProjects = (projectsList) => {
        return Object.keys(projects).find(
            (key) => projects[key] === projectsList
        );
    };
    const [selectedCategorie, setSelectedCategorie] = useState(() =>
        getCategorieFromProjects(projects.web)
    );
    console.log(selectedProjects);
    console.log(selectedCategorie);

    useEffect(() => {
        const btnWeb = document.getElementById("btn_web");
        const btnAppli = document.getElementById("btn_appli");
        const btnProjetsPersos = document.getElementById("btn_projets_persos");
        const btnMobile= document.getElementById("btn_mobile");

        btnWeb.addEventListener("click", () => {
            console.log("web");
            setSelectedProjects(projects.web)
            setSelectedCategorie("web")
        });
        btnAppli.addEventListener("click", () => {
            console.log("appli");
            setSelectedProjects(projects.applications)
            setSelectedCategorie("appli")
        });
        btnProjetsPersos.addEventListener("click", () => {
            console.log("projetsPersos");
            setSelectedProjects(projects.projetsPersos)
            setSelectedCategorie("projetsPersos")
        });
        btnMobile.addEventListener("click", () => {
            console.log("mobile");
            setSelectedProjects(projects.mobile)
            setSelectedCategorie("mobile")
        });

        // Optionnel : nettoyage au démontage
        // return () => {
        //     btnWeb?.removeEventListener("click", () => {});
        //     btnAppli?.removeEventListener("click", () => {});
        // };
    }, []);

    return (
        <>
            <Header></Header>
            <body className="bg-[url('/portfolio/projects_img/test.avif')] bg-cover bg-center bg-no-repeat">
            <div>
                <MaPage></MaPage>
            </div>

            <div id="conteneurProjets">
                <Projets selectedProjects={selectedProjects} />
            </div>
            <Stats selectedProjects={selectedProjects} selectedCategorie={selectedCategorie}/>
            </body>

        </>
    )
}

export default App
