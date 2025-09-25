export interface ISales {
  batchName: string;
  quantity: number;
  price: number;
  date: string;
  customerName: string;
  phone: number| null;
  modeOfPayment: string;
  [key: string]: string | number | null;
}
export interface SalesState {
  salesDetails: ISales[];
  loading: boolean;
  error: string;
}
