export interface DistritoResponse {
    _id:       string;
    nombre:    string;
    active:    boolean;
    locals:    Local[];
    createdAt: Date;
    updatedAt: Date;
    slug:      string;
    __v:       number;
}

export interface Local {
    _id:       string;
    telefono:  string;
    direccion: string;
    active:    boolean;
    slug:      string;
}