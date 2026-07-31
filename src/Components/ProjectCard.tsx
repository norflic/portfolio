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
            <div className="card flex h-96 w-full min-w-0 flex-col overflow-hidden text-center">
                <h3 className="shrink-0">{displayedProject.title}</h3>

                <div className="mb-2 flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden">
                    <img
                        src={imagePath}
                        alt="image du projet"
                        loading="eager"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {availableLinks.length > 0 && (
                    <LinkManager links={availableLinks} />
                )}

                <p className="mt-1 line-clamp-3 w-full min-w-0 leading-snug">
                    {displayedProject.description}
                </p>
            </div>
    );
}