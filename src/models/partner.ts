export interface BasePartnerDetail {
  name: string;
  phone: string;
  address: string;
  _id?:string
}
export interface PartnerDetail extends BasePartnerDetail {
  id: number;
}

export interface PartnerState {
  partnerDetails: PartnerDetail[];
  loading: boolean;
  error: string;
}
