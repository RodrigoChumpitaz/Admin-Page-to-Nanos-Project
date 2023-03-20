export interface Carta {
    category:    Category;
    _id?:         string;
    name:        string;
    price:       number;
    description: string;
    imgUrl:      string;
    available:   boolean;
    createdAt?:   Date;
    updatedAt?:   Date;
    slug:        string;
}

export interface Category {
    id:   string;
    name: string;
    slug: string;
}

/*  CLASE CART */

export class Cart{
    category?:    Category | any;
    _id?:         string  | any;
    name?:        string | any;
    price?:       number | any;
    description?: string | any;
    imgUrl?:      string | any;
    available?:   boolean | any;
    createdAt?:   Date | any;
    updatedAt?:   Date | any;
    slug?:        string | any;
}