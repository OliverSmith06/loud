export interface Video {
    dance: number;
    order: number;
    date: Date;
    name?: string[];
    desc?: string[];
}

export interface VideoResponse {
    id: number;
    dance: number;
    order: number;
    date: Date;
    name?: string[];
    desc?: string[];
}