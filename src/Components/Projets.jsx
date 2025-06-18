import ProjectCard from "./ProjectCard.jsx";

export default function Projets({selectedProjects}) {

    return (
        <div className="flex flex-col justify-between">

            <div className="flex flex-row gap-10 mx-10">
                {selectedProjects.map((oneProject, index) => (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <ProjectCard key={index} DisplayedProject={oneProject}/>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            {Array.from({length: 5}).map((_, i) => (
                                <img
                                    key={`${index}-${i}`}
                                    src={i < oneProject.note ? "/portfolio/projetcts_img/coeur.png" : "/portfolio/projetcts_img/coeur_vide.png"}
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
