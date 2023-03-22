export interface PedidosInterface {
  client:       Client;
  _id:          string;
  deliveryDate: Date;
  imgPrueba:    string;
  observation:  string;
  status:       string;
  orderDetail:  OrderDetail[];
  slug:         string;
}

export interface Client {
  id:    string;
  name:  string;
  email: string;
  slug:  string;
}

export interface OrderDetail {
  _id:      string;
  Cart:     Cart;
  quantity: number;
}

export interface Cart {
  category: Category;
  _id:      string;
  name:     string;
  price:    number;
}

export interface Category {
  name: string;
}

export interface DetailOrderResponse {
  _id:      string;
  Cart:     Cart;
  quantity: number;
}

export interface Cart {
  category: Category;
  _id:      string;
  name:     string;
  price:    number;
}

export interface Category {
  name: string;
}

