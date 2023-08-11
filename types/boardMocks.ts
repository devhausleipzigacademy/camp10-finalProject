export type Id = string | number;

export type Column = {
    id: Id;
    title: string;
    colour: string;
};

export type Job = {
    id: Id;
    colId: Id;
    job_title: string;
    company?: string;
    deadline?: string;
    location?: string;
    city?: string;
    url?: string;
};
