import { Fragment } from "react";
import { ProjectCategory, Projects } from "../Models/Project";

type HeaderProps = {
    projects: Projects;
    selectedCategory: ProjectCategory;
    onSelectCategory: (category: ProjectCategory) => void;
};

export default function Header({ projects, selectedCategory, onSelectCategory }: HeaderProps) {
    return (
        <>
            <header className="fixed w-full h-20 bg-black/80 flex justify-center z-50 ">
                <nav className="flex top-0 right-0  justify-center items-center my-2 gap-12 ">
                    {Object.values(ProjectCategory).map((category, index) => (
                        <Fragment key={category}>
                            {index > 0 && <hr className="h-6 w-px bg-gray-300" />}
                            <button
                                className="dark_outline"
                                onClick={() => onSelectCategory(category)}
                            >
                                {projects[category].title}
                            </button>
                        </Fragment>
                    ))}
                </nav>
            </header>
            <hr className="h-20">
            {/*    placeholder*/}
            </hr>
        </>
    );
}
