import { Fragment } from "react";
import { ProjectCategory, Projects } from "../Models/Project";
import { Link } from "react-router-dom";
import Divider from "./Divider.tsx";
import CategoryLink from "./CategoryLink.tsx";

type NavbarProps = {
    projects: Projects;
    selectedCategory: ProjectCategory;
    onSelectCategory: (category: ProjectCategory) => void;
};

export default function Navbar({ projects, selectedCategory, onSelectCategory }: NavbarProps) {
    return (
        <>
            <header className="fixed w-full h-20 bg-black/80 flex justify-center z-50 ">
                <nav className="flex top-0 right-0 justify-center items-center my-2 gap-12 ">
                    {Object.values(ProjectCategory).map((category) => (
                        <Fragment key={category}>
                            <CategoryLink
                                category={category}
                                title={projects[category].title}
                                onSelectCategory={onSelectCategory}
                            />
                            <Divider/>
                        </Fragment>
                    ))}
                    <Link to="/competences" className="dark_outline">
                        Compétences
                    </Link>
                </nav>
            </header>
            <hr className="h-20">
                {/*    placeholder*/}
            </hr>
        </>
    );
}

