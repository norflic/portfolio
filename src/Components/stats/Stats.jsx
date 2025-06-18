import MonPieChart from "./MonPieChart.jsx";
import BarChartCompetences from "./BarChartCompetences.jsx";
import {RadarChart} from "recharts";
import MyRadarChart from "./MyRadarChart.jsx";

export default function Stats({selectedProjects, selectedCategorie}) {
    // console.log("selectedProjects = ");
    // console.log(selectedProjects);
    return (
        <div className="pt-8">
            <h1 className="text-center pb-8">
                Statistiques
            </h1>
            <div className="flex flex-row">
                <div className="flex-1">
                    <MonPieChart selectedProjects={selectedProjects}></MonPieChart>
                </div>
                <div className="flex-1">
                    <BarChartCompetences selectedCategorie={selectedCategorie}></BarChartCompetences>
                </div>
                <div className="flex-1">
                    <MyRadarChart></MyRadarChart>
                </div>
            </div>

            {/*<img src="public/projects_img/repartition_travail_projets.png" alt="diagramme temps passé par projet"/>*/}
        {/*    possibilite d'afficher les stats de wakapi*/}
        </div>
    )
//     TODO ; afficher chaque projet ce que j'ai bien aimé avec des etoiles vides et p  leines

}