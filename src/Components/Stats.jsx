import MonPieChart from "./MonPieChart.jsx";

export default function Stats({selectedProjects}) {
    // console.log("selectedProjects = ");
    // console.log(selectedProjects);
    return (
        <>
            <h1 className="text-center">
                statistiques
            </h1>
            <MonPieChart selectedProjects={selectedProjects}></MonPieChart>
            {/*<img src="public/projetcts_img/repartition_travail_projets.png" alt="diagramme temps passé par projet"/>*/}
        {/*    possibilite d'afficher les stats de wakapi*/}
        </>
    )
//     TODO ; afficher chaque projet ce que j'ai bien aimé avec des etoiles vides et p  leines

}