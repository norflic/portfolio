import '../assets/projet.css';
import {Project} from "../Models/Project.ts";

export type ProjectCardProps = {
    displayedProject: Project;
}

export default function ProjectCard({ displayedProject}: ProjectCardProps) {
    if (!displayedProject) return null;

    let imagePath: string = "/portfolio/projects_img/image_indisponible.png"
    if (displayedProject.image !== ""){
        imagePath = displayedProject.image;
    }

    return (
            <div className="card flex-1 flex flex-col justify-between  items-center text-center  h-96">
                <span>

                    <h3>{displayedProject.title}</h3>

                    <span className="w-full aspect-video overflow-hidden mb-2">
                            <img
                                src={imagePath}
                                alt='image du projet'
                                loading="eager"
                                decoding="async"
                                className="w-full max-h-3/4  object-contain"
                            />
                    </span>
                </span>
                {displayedProject.lienSite && (
                    <a href={displayedProject.lienSite} target="_blank" rel="noopener noreferrer">
                        lien vers {displayedProject.title}
                    </a>
                )}
                <p className="max-w-md whitespace-normal">{displayedProject.description}</p>
            </div>
    );
}