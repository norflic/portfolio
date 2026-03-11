import { Project } from "../Models/Project";
import ProjectCard from "./ProjectCard";
import clsx from "clsx";

export type ProjetsProps = {
    selectedProjects: Project[]
}

export default function Projets({selectedProjects}: ProjetsProps) {

    return (
        <div className="flex flex-col justify-between">

            <div className="flex flex-row gap-10 mx-10 justify-center ">
                {selectedProjects.map((project, index) => (
                    <div className=" flex flex-col items-center ">
                        <ProjectCard key={index} displayedProject={project}/>
                        {/*TODO : easter egg coueurs de meinceraft*/}
                        <div className="flex flex-row  ">
                            {Array.from({length: 5}).map((_, i) => (
                                <img
                                    key={`${index}-${i}`}
                                    src={i < project.note ? "/portfolio/projects_img/coeur.png" : "/portfolio/projects_img/coeur_vide.png"}
                                    alt={i < project.note ? "coeur plein" : "coeur vide"}
                                    className={clsx(
                                        "mx-0.5 transition-all duration-300",
                                        i > project.note-1 ? "w-8 h-8 translate-x-[-0px] translate-y-[3px]" : "w-10 h-10"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

}
