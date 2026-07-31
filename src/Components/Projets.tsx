import { Project } from "../Models/Project";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";
import clsx from "clsx";

export type ProjetsProps = {
  selectedProjects: Project[];
};

export default function Projets({ selectedProjects }: ProjetsProps) {
  const carouselKey = selectedProjects.map((p) => p.title).join("|");

  return (
    <div className="flex flex-col justify-between">
      <ProjectCarousel
        items={selectedProjects}
        carouselKey={carouselKey}
        renderSlide={(project, index) => (
          <div className="flex w-full min-w-0 flex-col items-center">
            <ProjectCard displayedProject={project} />
            <div className="flex flex-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={`${index}-${i}`}
                  src={
                    i < project.note
                      ? "/portfolio/projects_img/coeur.png"
                      : "/portfolio/projects_img/coeur_vide.png"
                  }
                  alt={i < project.note ? "coeur plein" : "coeur vide"}
                  className={clsx(
                    "mx-0.5 transition-all duration-300",
                    i > project.note - 1
                      ? "w-8 h-8 translate-x-[-0px] translate-y-[3px]"
                      : "w-10 h-10",
                  )}
                />
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}
