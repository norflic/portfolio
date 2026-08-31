import Navbar from "../Components/Navbar";
import MaPage from "../Components/MaPage";
import Projets from "../Components/Projets";
import Stats from "../Components/stats/Stats";
import { ProjectCategory, Projects } from "../Models/Project";

type ProjetsPageProps = {
    projects: Projects;
    selectedCategory: ProjectCategory;
    onSelectCategory: (category: ProjectCategory) => void;
};

export default function ProjetsPage({ projects, selectedCategory, onSelectCategory }: ProjetsPageProps) {
    const selectedProjects = projects[selectedCategory].projects;

    return (
        <>
            <Navbar
                projects={projects}
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />
            <div className=" bg-[url('/portfolio/projects_img/test.avif')] bg-cover bg-center bg-no-repeat">
                <div>
                    <MaPage></MaPage>
                </div>

                <div id="conteneurProjets">
                    <Projets selectedProjects={selectedProjects}/>
                </div>
                <Stats selectedProjects={selectedProjects} selectedCategorie={selectedCategory}/>
            </div>

        </>
    )
}


