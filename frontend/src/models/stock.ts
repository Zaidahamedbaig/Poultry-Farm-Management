export interface Imortality {
  batchName: string;
  date: string;
  quantity: number;
  reason: string;
}
export interface IMissing {
  batchName: string;
  date: string;
  quantity: number;
  reason: string;
}

export interface IConsumedFeed {
  feedBatchName: string;
  batchName: string;
  date: string;
  preStarterCount: number;
  preStarterPrice: number;
  starterCount: number;
  starterPrice: number;
  layerCount: number;
  layerPrice: number;
}

export interface IStockDetails {
  batchName?: string;
  status?: number;
  partner: string;
  quantity: number;
  currentQuantity: number ;
  price: number;
  dateOfBirth: string;
  dateOfPurchase: string;
  mortality?: Imortality[];
  missing?: IMissing[];
  consumedFeed?: IConsumedFeed[];
}

export interface StockState {
  stockDetails: IStockDetails[];
  loading: boolean;
  error: string;
}
