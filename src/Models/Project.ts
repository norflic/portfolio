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

export type LinkCheckStatus = null | "isValid" | "isInvalid" | "error";

export type Lien = {
    lien: string;
    status: LinkCheckStatus;
}

export type Projects = {
    [key in ProjectCategory]: Project[];
}