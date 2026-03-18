import { LinkCheckStatus, Projects, ProjectCategory } from "../Models/Project";

const LINK_REQUEST_TIMEOUT_MS = 2000;

async function fetchWithTimeout(
    href: string,
    init: RequestInit,
    timeoutMs: number
): Promise<Response | "timeout"> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
        return await fetch(href, {
            ...init,
            signal: controller.signal,
        });
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            return "timeout";
        }
        throw error;
    } finally {
        window.clearTimeout(timeoutId);
    }
}

export async function destinationExists(href: string): Promise<boolean> {
    const status = await getLinkStatus(href);
    return status === "isValid";
}

export async function getLinkStatus(href: string): Promise<LinkCheckStatus> {
    if (!href || href === "#") return "isInvalid";

    // Avoid mixed-content fetch blocking (HTTPS page checking HTTP URL).
    if (window.location.protocol === "https:" && href.startsWith("http://")) {
        return null;
    }

    try {
        const headResponse = await fetchWithTimeout(href, {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-store",
        }, LINK_REQUEST_TIMEOUT_MS);

        if (headResponse === "timeout") return "isInvalid";

        if (headResponse.type === "opaque") return "isValid";
        return headResponse.ok ? "isValid" : "isInvalid";
    } catch {
        try {
            const getResponse = await fetchWithTimeout(href, {
                method: "GET",
                mode: "no-cors",
                cache: "no-store",
            }, LINK_REQUEST_TIMEOUT_MS);

            if (getResponse === "timeout") return "isInvalid";

            if (getResponse.type === "opaque") return "isValid";
            return getResponse.ok ? "isValid" : "isInvalid";
        } catch {
            return "error";
        }
    }
}

export async function updateProjectsLinksStatus(projects: Projects): Promise<Projects> {
    const categories = Object.values(ProjectCategory);
    const updatedProjects = {} as Projects;

    await Promise.all(
        categories.map(async (category) => {
            const updatedCategoryProjects = await Promise.all(
                projects[category].map(async (project) => {
                    const updatedLinks = await Promise.all(
                        project.listeLiens.map(async (linkItem) => ({
                            ...linkItem,
                            status: await getLinkStatus(linkItem.lien),
                        }))
                    );

                    return {
                        ...project,
                        listeLiens: updatedLinks,
                    };
                })
            );

            updatedProjects[category] = updatedCategoryProjects;
        })
    );

    return updatedProjects;
}