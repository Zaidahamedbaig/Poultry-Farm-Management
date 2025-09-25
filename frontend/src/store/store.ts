import { configureStore } from "@reduxjs/toolkit";
import partner from "./slices/partner/partnerSlice";
import stock from "./slices/stock/stockSlice";
import feed from "./slices/feed/feedSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sales from "./slices/sales/salesSlice";

export const store = configureStore({
  reducer: {
    partner,
    stock,
    sales,
    feed,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
