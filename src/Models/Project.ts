export enum ProjectCategory {
    Web = "web",
    Applications = "applications",
    ProjetsPersos = "projetsPersos",
    Mobile = "mobile",
    Entreprise = "entreprise"
}

export type Project = {
    title: string;
    image: string;
    listeLiens: Lien[];
    description: string;
    note: number;
    data: {
        time: number;
    };
}

export type LinkCheckStatus = "unchecked" | "isValid" | "isInvalid" | "notUpdateableInvalid" | "error";

export type Lien = {
    lien: string;
    status: LinkCheckStatus;
}

export type ProjectSection = {
    title: string;
    projects: Project[];
};

export type Projects = {
    [key in ProjectCategory]: ProjectSection;
}