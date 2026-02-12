export interface Project {
    id: string;
    title: string;
    description?: string;
    link: string;
    imageUrl: string;
    techs: string[];
    createdAt?: string;
    views?: number;
}