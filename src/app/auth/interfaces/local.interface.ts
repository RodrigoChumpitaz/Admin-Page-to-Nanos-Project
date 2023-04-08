export interface RegistrarlocalI {
    _id: string
    distrito:  Distrito;
    telefono:  string;
    direccion: string;
    active?:    boolean

}

export interface RegistrarlocaI {
    _id?:       string | any;
    distrito?:  Distrito | any;
    telefono?:  string | any;
    direccion?: string | any;
    active?:    boolean | any;

}

export interface Distrito {
    id:   string;
    slug: string;
    name: string;
}

export interface UpdateLocal {
    message: string;
    local:   Local;
}

export interface Local {
    distrito:  Distrito;
    _id:       string;
    telefono:  string;
    direccion: string;
    active:    boolean;
    slug:      string;
    updatedAt: Date;
}

export interface Distrito {
    id:   string;
    slug: string;
    name: string;
}