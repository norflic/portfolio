import '../assets/projet.css';
import {Project} from "../Models/Project.ts";
import LinkManager from "./LinkManager.tsx";

export type ProjectCardProps = {
    displayedProject: Project;
}

export default function ProjectCard({ displayedProject}: ProjectCardProps) {
    if (!displayedProject) return null;
    const availableLinks = displayedProject.listeLiens;

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
                {availableLinks.length > 0 && (
                    <LinkManager links={availableLinks}>
                        lien vers {displayedProject.title}
                    </LinkManager>
                )}
                <p className="max-w-md whitespace-normal">{displayedProject.description}</p>
            </div>
    );
}