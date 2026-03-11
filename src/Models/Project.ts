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
    lienSite?: string;
    description: string;
    note: number;
    data: {
        time: number;
    };
}

export type Projects = {
    [key in ProjectCategory]: Project[];
}