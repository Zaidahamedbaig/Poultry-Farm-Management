import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FeedState, IFeed } from "../../../models/feed";
import { getAllFeed } from "../../thunk/feed/getFeedStock";

const initialState: FeedState = {
  feedDetails: [],
  loading: false,
  error: "",
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeed.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        getAllFeed.fulfilled,
        (state, action: PayloadAction<IFeed[]>) => {
          state.loading = false;
          state.feedDetails = action.payload;
        }
      )
      .addCase(getAllFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectFeedStock = (state: RootState) => state.feed.feedDetails;

export default feedSlice.reducer;
