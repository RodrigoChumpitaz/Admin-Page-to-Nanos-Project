export interface CategoriaI {
    _id:         string;
    description: string;
    imgUrl:      string;
    state:       boolean;
    createdAt:   Date;
    updatedAt:   Date;
    slug:        string;
    __v:         number;
}

export interface Cat {
    _id?:         string | any;
    description?: string | any;
    imgUrl?:      string | any;
    state?:       boolean | any;
    createdAt?:   Date | any;
    updatedAt?:   Date | any;
    slug?:        string | any;
    __v?:         number | any;
}