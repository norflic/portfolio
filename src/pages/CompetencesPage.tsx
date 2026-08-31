import Navbar from "../Components/Navbar";
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
            <div className=" bg-[url('/portfolio/projects_img/test.avif')] bg-cover bg-center bg-no-repeat min-h-screen">
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="text-5xl font-bold">Hello World - Compétences</h1>
                </div>
            </div>
        </>
    );
}


