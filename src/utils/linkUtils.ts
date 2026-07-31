import {LinkCheckStatus, Projects, ProjectCategory, Lien} from "../Models/Project";

const LINK_REQUEST_TIMEOUT_MS = 5000;
const SOFT_INVALID_TIMEOUT_MS = 2000;

export const LINK_STATUS_UPDATE_EVENT = "link-status-update";

export type LinkStatusUpdateDetail = {
    category: ProjectCategory;
    projectIndex: number;
    linkIndex: number;
    status: LinkCheckStatus;
};

function emitLinkStatusUpdate(detail: LinkStatusUpdateDetail): void {
    window.dispatchEvent(new CustomEvent<LinkStatusUpdateDetail>(LINK_STATUS_UPDATE_EVENT, {detail}));
}

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
        return "unchecked";
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

    categories.forEach((category) => {
        projects[category].projects.forEach((project, projectIndex) => {
            project.listeLiens.forEach((linkItem: Lien, linkIndex) => {
                if (linkItem.status === "notUpdateableInvalid") {
                    return;
                }

                void (async () => {
                    let softTimeoutTriggered = false;
                    const softTimer = window.setTimeout(() => {
                        softTimeoutTriggered = true;
                        emitLinkStatusUpdate({
                            category,
                            projectIndex,
                            linkIndex,
                            status: "isInvalid",
                        });
                    }, SOFT_INVALID_TIMEOUT_MS);

                    const finalStatus = await getLinkStatus(linkItem.lien);
                    window.clearTimeout(softTimer);

                    if (!softTimeoutTriggered || finalStatus !== "isInvalid") {
                        emitLinkStatusUpdate({
                            category,
                            projectIndex,
                            linkIndex,
                            status: finalStatus,
                        });
                    }
                })();
            });
        });
    });

    return projects;
}