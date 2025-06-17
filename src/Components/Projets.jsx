import ProjectCard from "./ProjectCard.jsx";

export default function Projets({selectedProjects}) {

    return (
        <div className="flex flex-col justify-between">

        <div className="flex flex-row gap-10 mx-10">
            {selectedProjects.map((oneProject, index) => (
                <ProjectCard key={index} DisplayedProject={oneProject} />
            ))}
        </div>
        </div>
    )

}
