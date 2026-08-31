import Navbar from "../Components/Navbar";
import CompetenceCard from "../Components/competences/CompetenceCard";
import { competencesData } from "../Models/Competence";
import { ProjectCategory, Projects } from "../Models/Project";

type CompetencesPageProps = {
    projects: Projects;
    selectedCategory: ProjectCategory;
    onSelectCategory: (category: ProjectCategory) => void;
};

export default function CompetencesPage({ projects, selectedCategory, onSelectCategory }: CompetencesPageProps) {
    return (
        <>
            <Navbar
                projects={projects}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />
            <div className="bg-[url('/portfolio/projects_img/test.avif')] bg-cover bg-center bg-no-repeat min-h-screen">
                <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                    {competencesData.map((competence) => (
                        <CompetenceCard key={competence.id} competence={competence} />
                    ))}
                </main>
            </div>
        </>
    );
}
