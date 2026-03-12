import '../assets/projet.css';
import {Project} from "../Models/Project.ts";

export type ProjectCardProps = {
    displayedProject: Project;
}

export default function ProjectCard({ displayedProject}: ProjectCardProps) {
    if (!displayedProject) return null;
    return (
            <div className="card flex-1 flex flex-col justify-between  items-center text-center  h-96">
                <span>

                    <h3>{displayedProject.title}</h3>

                    <span className="w-full aspect-video overflow-hidden mb-2">
                        {displayedProject.image &&
                            <img
                                src={displayedProject.image}
                                alt='image du projet'
                                loading="eager"
                                decoding="async"
                                className="w-full max-h-3/4  object-contain"
                            />
                        }
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