export interface AuthResponse{
  token: string;
  status: boolean;
}
export interface SingupInterface {
  msg:  string;
  data: Data;
}

export interface Data {
  name:           string;
  lastname:       string;
  documentType:   string;
  documentNumber: string;
  email:          string;
  password:       string;
  roles:          string[];
}

export interface DocumentType {
  _id:       string;
  type:      string;
  createdAt: Date;
  updatedAt: Date;
  slug:      string;
}


export interface ProfileInterface {
  _id:            string;
  name:           string;
  documentType:   string;
  documentNumber: string;
  email:          string;
  address:        string;
  confirmed:      boolean;
  roles:          Rol[];
  createdAt:      Date;
  updatedAt:      Date;
}

export interface Rol {
  _id:         string;
  rol:         string;
  permissions: any[];
  createdAt:   Date;
  updatedAt:   Date;
}
