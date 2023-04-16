export interface ReportCartResponse {
    total: number;
    _id:   string;
    name:  string;
  }
  
  /* -------------------------------------- */
  export interface SalesPerDayResponse {
    _id:   ID;
    sales: Sale[];
  }
  
  export interface ID {
    name: string;
  }
  
  export interface Sale {
    name:  Date;
    value: number;
  }
  
  /* -------------------------------------- */
  
  export interface SalesPerClient {
    _id:    ID;
    series: Series[];
  }
  
  export interface Series {
    name:  Date;
    value: number;
  }
  
  export interface CategorySalesResponse {
    _id:   string;
    total: number;
  }
  /* -------------------------------------- */
  
  export interface DetailSaleByDate {
    _id:  ID;
    data: Datum[];
  }
  
  export interface ID {
    carta: string;
  }
  
  export interface Datum {
    name:  Date;
    value: number;
  }
  