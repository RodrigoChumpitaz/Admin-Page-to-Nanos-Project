export interface ListarusuariosI {
    _id:            string;
    name:           string;
    lastname:       string;
    documentType:   string;
    documentNumber: string;
    email:          string;
    password:       string;
    address:        string;
    token:          string;
    confirmed:      boolean;
    roles:          Role[];
    createdAt:      Date;
    updatedAt:      Date;
}

export interface Role {
    _id:         string;
    rol:         string;
    permissions: string[];
    createdAt:   Date;
    updatedAt:   Date;
    isActive:    boolean;
}