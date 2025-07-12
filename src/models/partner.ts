export interface PartnerDetail {
  id: number;
  name: string;
  phone: number;
  address: string;
}

export interface PartnerState {
    partnerDetails : PartnerDetail[],
    loading: boolean,
    error: string
}
