import ProjectCard from "./ProjectCard.jsx";

export default function Projets({selectedProjects}) {

    return (
        <div className="flex flex-col justify-between">
        <nav className="flex flex-row justify-between divide-x divide-gray-300 my-2">
            <span></span>
            <a href="">web</a>
            <a href="">applications</a>
            <span></span>
        </nav>

        <div className="flex flex-row gap-10 mx-10">
            {selectedProjects.map((oneProject, index) => (
                <ProjectCard key={index} DisplayedProject={oneProject} />
            ))}
        </div>
        </div>
    )

}
