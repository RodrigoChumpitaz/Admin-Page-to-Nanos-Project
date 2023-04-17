export interface ReceiptsResponse {
  payment:       Payment;
  _id:           string;
  orderId:       string;
  igv:           number;
  subtotal:      number;
  total:         number;
  discount:      number;
  receiptNumber: number;
  createdAt:     Date;
  updatedAt:     Date;
  slug:          string;
  __v:           number;
}

export interface Payment {
  id:   string;
  slug: string;
}


export interface DetailResponse {
  _id:      string;
  Cart:     Cart;
  order:    Order;
  quantity: number;
  slug:     string;
}

export interface Cart {
  category:    Category;
  _id:         string;
  name:        string;
  price:       number;
  description: string;
  imgUrl:      string;
}

export interface Category {
  name: string;
}

export interface Order {
  client:       Client;
  _id:          string;
  deliveryDate: Date;
  observation:  string;
  status:       string;
  saleType:     string;
}

export interface Client {
  id:    string;
  email: string;
}
