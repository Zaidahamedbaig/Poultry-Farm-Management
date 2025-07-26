import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PartnerDetail, PartnerState } from "../../../models/partner";
import { RootState } from "../../store";
import { getPartnerDetails } from "../../thunk/partner/getPartnerDetails";

const initialState: PartnerState = {
  partnerDetails: [],
  loading: false,
  error: ''
  
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setPartnerDetails: (state, action: PayloadAction<PartnerDetail[]>) => {
      state.partnerDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPartnerDetails.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(getPartnerDetails.fulfilled, (state, action: PayloadAction<PartnerDetail[]>) => {
        state.loading = false
        state.partnerDetails = action.payload
      })
      .addCase(getPartnerDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export const selectPartnerDetails = (state: RootState) =>
  state.partner.partnerDetails ;
export const { setPartnerDetails } = partnerSlice.actions;

export default partnerSlice.reducer;
