export interface Video {
    dance: number;
    order: number;
    date: Date;
    name?: string[];
    desc?: string[];
    video_type?: string[];
}

export interface VideoResponse {
    id: number;
    dance: number;
    order: number;
    date: Date;
    name?: string[];
    desc?: string[];
}