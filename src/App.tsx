import { Routes, Route, Navigate } from 'react-router-dom';
import ProjetsPage from './pages/ProjetsPage';
import CompetencesPage from './pages/CompetencesPage';
import { useState, useEffect, useRef } from 'react';
import { ProjectCategory, Projects, initialProjects } from './Models/Project';
import { LINK_STATUS_UPDATE_EVENT, LinkStatusUpdateDetail, updateProjectsLinksStatus } from './utils/linkUtils';

function App() {
    const preloadedImagesRef = useRef<Set<string>>(new Set());
    const [projects, setProjects] = useState<Projects>(initialProjects);
    const [selectedCategorie, setSelectedCategorie] = useState<ProjectCategory>(ProjectCategory.Web);

    // Wrapper function pour convertir le type Dispatch en (category) => void
    const handleSelectCategory = (category: ProjectCategory) => {
        setSelectedCategorie(category);
    };

    useEffect(() => {
        const handleLinkStatusUpdate = (event: Event) => {
            console.log("réponse recue")
            const customEvent = event as CustomEvent<LinkStatusUpdateDetail>;
            const {category, projectIndex, linkIndex, status} = customEvent.detail;

            setProjects((prev) => {
                const section = prev[category];
                const project = section.projects[projectIndex];
                const linkItem = project?.listeLiens?.[linkIndex];

                if (!project || !linkItem || linkItem.status === status) {
                    return prev;
                }

                const updatedLinks = [...project.listeLiens];
                updatedLinks[linkIndex] = {
                    ...linkItem,
                    status,
                };

                const updatedCategoryProjects = [...section.projects];
                updatedCategoryProjects[projectIndex] = {
                    ...project,
                    listeLiens: updatedLinks,
                };

                return {
                    ...prev,
                    [category]: {
                        ...section,
                        projects: updatedCategoryProjects,
                    },
                };
            });
        };

        window.addEventListener(LINK_STATUS_UPDATE_EVENT, handleLinkStatusUpdate as EventListener);
        void updateProjectsLinksStatus(initialProjects);

        return () => {
            window.removeEventListener(LINK_STATUS_UPDATE_EVENT, handleLinkStatusUpdate as EventListener);
        };
    }, []);

    useEffect(() => {
        const preload = (src: string) => {
            if (!src || preloadedImagesRef.current.has(src)) return;

            const image = new Image();
            image.src = src;
            preloadedImagesRef.current.add(src);
        };

        const currentCategoryImages = projects[selectedCategorie].projects.map((project) => project.image);
        const allImages = Object.values(projects).flatMap((section) =>
            section.projects.map((project) => project.image)
        );

        const uniqueCurrentImages = Array.from(new Set(currentCategoryImages));
        const uniqueOtherImages = Array.from(
            new Set(allImages.filter((src) => !uniqueCurrentImages.includes(src)))
        );

        // Prioritize images for the currently visible category.
        uniqueCurrentImages.forEach(preload);

        const delayedTimers: number[] = [];
        const backgroundStartTimer = window.setTimeout(() => {
            uniqueOtherImages.forEach((src, index) => {
                const timerId = window.setTimeout(() => preload(src), index * 120);
                delayedTimers.push(timerId);
            });
        }, 250);

        return () => {
            window.clearTimeout(backgroundStartTimer);
            delayedTimers.forEach((timerId) => window.clearTimeout(timerId));
        };
    }, [selectedCategorie]);

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/projets" replace />} />
            <Route
                path="/projets"
                element={
                    <ProjetsPage
                        projects={projects}
                        selectedCategory={selectedCategorie}
                        onSelectCategory={handleSelectCategory}
                    />
                }
            />
            <Route
                path="/competences"
                element={
                    <CompetencesPage
                        projects={projects}
                        selectedCategory={selectedCategorie}
                        onSelectCategory={handleSelectCategory}
                    />
                }
            />
        </Routes>
    );
}

export default App
