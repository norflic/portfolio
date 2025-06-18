import MonPieChart from "./MonPieChart.jsx";
import MonBarChart from "./MonBarChart.jsx";

export default function Stats({selectedProjects, selectedCategorie}) {
    // console.log("selectedProjects = ");
    // console.log(selectedProjects);
    return (
        <>
            <h1 className="text-center">
                statistiques
            </h1>
            <div className="flex flex-row">
                <MonPieChart selectedProjects={selectedProjects}></MonPieChart>
                <MonBarChart selectedCategorie={selectedCategorie}></MonBarChart>

            </div>

            {/*<img src="public/projects_img/repartition_travail_projets.png" alt="diagramme temps passé par projet"/>*/}
        {/*    possibilite d'afficher les stats de wakapi*/}
        </>
    )
//     TODO ; afficher chaque projet ce que j'ai bien aimé avec des etoiles vides et p  leines

}