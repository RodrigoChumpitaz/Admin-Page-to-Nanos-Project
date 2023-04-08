export interface AuthResponse{
  token: string;
  status: boolean;
}
export interface SingupInterface {
  msg:  string;
  data: Data;
}

export interface Data {
  _id:            string;
  name:           string;
  lastname:       string;
  documentType:   string;
  documentNumber: string;
  email:          string;
  password:       string;
  roles:          string[];
  status?:        string;
}

export interface Dat {
  _id?:            string | any;
  name?:           string | any;
  lastname?:       string | any;
  documentType?:   string | any;
  documentNumber?: string | any;
  email?:          string | any;
  password?:       string | any;
  roles?:          string[] | any;
  status?:          string | any;
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
