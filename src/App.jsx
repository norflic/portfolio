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
                    "Nous devions faire un site web sans contraintes principales mais étions limités car nous n'avions pas encore vu le JS. Nous avons tout de même réussi à afficher un bandeau déroulant.",
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
                    "Ce site est le résultat d'un an de travail. Il a été fait en React. L'objectif était de permettre à des joueurs de basket de s'organiser pour se retrouver sur un terrain.",
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
                    "Ce site a été le premier à être réalisé à l'aide de symfony et certainement pas le dernier. Il est l'un des projets les plus complets, de part so style graphique très travaillé et grâce au temps passé.",
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
                image: "/portfolio/projects_img/moove_green.png",
                // lienSite: "http://p2301438.pages.univ-lyon1.fr/sae-1.05-recueil-des-besoins/",
                description:
                    "Pour un cours d'anglais, comme projet, nous avons eu l'idée de tous faire un mini jeu puis de les rassembler",
                note:5,
                data: {
                    time: 50,
                },
            },
            {
                title: "Tours d'Hanoi",
                image: "/portfolio/projects_img/tours_hanoi.png",
                // lienSite: "http://p2301438.pages.univ-lyon1.fr/sae-1.05-recueil-des-besoins/",
                description:
                    "Pour un cours d'anglais, comme projet, nous avons eu l'idée de tous faire un mini jeu puis de les rassembler",
                note:5,
                data: {
                    time: 50,
                },
            },
        ],
        projetsPersos : [
            {
                title: "Site de plongée",
                image: "/portfolio/projects_img/image_indisponible.png",
                description:
                    "Ce site m'a été demandé par un proche. Je l'ai fait avec plaisir pour participer à la vie associative du club de plongée de Lyon",
                note:4,
                data: {
                    time: 25,
                },
            },
            {
                title: "portfolio",
                image: "/portfolio/projects_img/portfolio.png",
                lienSite: "#",
                description:
                    "Ce site est le résultat d'un an de travail. Il a été fait en React. L'objectif était de permettre à des joueurs de basket de s'organiser pour se retrouver sur un terrain.",
                note:4,
                data: {
                    time: 30,
                },
            },
        ],
        mobile : [
            {
                title: "Livraison",
                image: "/portfolio/projects_img/image_indisponible.png",
                description:
                    "Livraison a été mon premier projet sur Kotlin. je me suis beaucoup inversi dedans, ce qui a fait que j'ai rapidement maitrisé les bases de ce langage",
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
            <div>
                <MaPage></MaPage>
            </div>

            <div id="conteneurProjets">
                <nav className="flex justify-center items-center my-2 gap-12">
                    <button id="btn_web">Web</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button id="btn_appli">Applications</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button id="btn_projets_persos">Projets persos</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button id="btn_mobile">Mobile</button>
                </nav>
                <Projets selectedProjects={selectedProjects} />
            </div>
            <Stats selectedProjects={selectedProjects} selectedCategorie={selectedCategorie}/>
        </>
    )
}

export default App
