interface IConsumedFeed {
  feedBatch: string;
  batchName: string;
  date: Date;
  preStaterCount: number;
  staterCount: number;
  layerCount: number;
}

export interface IFeed {
  feedBatch?: string;
  date: string;
  starterCount: number;
  preStarterCount: number;
  layerCount: number;
  starterPrice: number;
  preStarterPrice: number;
  layerPrice: number;
  transportationAndOthers: number;
  feed?: IConsumedFeed[];
}
export interface FeedState {
  feedDetails: IFeed[];
  loading: boolean;
  error: string;
}
