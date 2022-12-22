import { createSlice } from "@reduxjs/toolkit";
import { TselectInputGroup } from "../models/stats";

const initialState = {
  items: [],
  error: "",
  isLoading: false,
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    updateFavouriteList: (state: any, action) => {
      const result = state.items.filter(
        (item: any) => item.id !== action.payload
      );
      console.log(result);
      return {
        ...state,
        items: result,
      };
    },
    addFavouriteItem: (state, action) => {
      return { ...state, items: [...state.items, action.payload] };
    },
  },
});

export const { updateFavouriteList, addFavouriteItem } = favouriteSlice.actions;
export default favouriteSlice.reducer;
