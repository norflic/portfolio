import ProjectCard from "./ProjectCard.jsx";

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
                                    className="w-10 h-10 mx-0.5"
                                />
                            ))}
                        </div>


                    </div>
                ))}

            </div>
        </div>
    )

}
