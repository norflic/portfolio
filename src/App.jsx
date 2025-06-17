import Header from "./Components/Header.jsx";
import MaPage from "./Components/MaPage.jsx";
import Projets from "./Components/Projets.jsx";
import Stats from "./Components/stats.jsx";

const projects = {
    web: [
        {
            id: "airplane_project",
            title: "SAE aéroport",
            image: "/projects_img/sae_aeroport.png",
            description:
                "Dans ce projet, nous devions, à partir de fichiers contenant des données de vols, afficher ces données et les traiter en appliquant le meilleur algorithme possible.",
        },
        {
            id: "first_website_project",
            title: "Moove green",
            image: "/projects_img/moove_green.png",
            link: "http://p2301438.pages.univ-lyon1.fr/sae-1.05-recueil-des-besoins/",
            description:
                "Nous devions faire un site web sans contraintes principales mais étions limités car nous n'avions pas encore vu le JS. Nous avons tout de même réussi à afficher un bandeau déroulant.",
        },
        {
            id: "challenger_project",
            title: "Challenger",
            image: "/projects_img/challenger_main_menu.png",
            link: "https://challenger.host/",
            description:
                "Ce site est le résultat d'un an de travail. Il a été fait en React. L'objectif était de permettre à des joueurs de basket de s'organiser pour se retrouver sur un terrain.",
        },
    ],

};


let selectedProjects = projects.web

function App() {
    return (
        <>
            <Header></Header>
            <div>
                <MaPage></MaPage>
            </div>
            <div>
                <Projets selectedProjects={selectedProjects} />
            </div>
            <Stats></Stats>
        </>
    )
}

export default App
