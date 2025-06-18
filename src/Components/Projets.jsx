import ProjectCard from "./ProjectCard.jsx";
import clsx from "clsx";

export default function Projets({selectedProjects}) {

    return (
        <div className="flex flex-col justify-between">

            <div className="flex flex-row gap-10 mx-10 justify-center ">
                {selectedProjects.map((oneProject, index) => (
                    <div className=" flex flex-col items-center ">
                        <ProjectCard key={index} DisplayedProject={oneProject}/>
                        {/*TODO : easter egg coueurs de meinceraft*/}
                        <div className="flex flex-row  ">
                            {Array.from({length: 5}).map((_, i) => (
                                <img
                                    key={`${index}-${i}`}
                                    src={i < oneProject.note ? "/portfolio/projects_img/coeur.png" : "/portfolio/projects_img/coeur_vide.png"}
                                    alt={i < oneProject.note ? "coeur plein" : "coeur vide"}
                                    className={clsx(
                                        "mx-0.5 transition-all duration-300",
                                        i > oneProject.note-1 ? "w-8 h-8 translate-x-[-0px] translate-y-[3px]" : "w-10 h-10"
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
