import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Tmembers, TstatsGroup } from "../models/stats";

export const getGroupInfo = createAsyncThunk(
  "vk/getMembers",
  async (settings: { id: number; offset: number; count: number }, thunkApi) => {
    try {
      return await new Promise((resolve, reject) => {
        // @ts-ignore
        VK.Api.call(
          "groups.getMembers",
          {
            group_id: settings.id,
            count: settings.count,
            v: "5.86",
          },
          (res) => {
            resolve(res.response);
          }
        );
      });
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState: Tmembers = {
  count: 0,
  error: "",
  isLoading: false,
};

export const memberSlice = createSlice({
  name: "Members",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getGroupInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getGroupInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.count = action.payload.count;
      })
      .addCase(getGroupInfo.rejected, (state, action) => {
        state.error = "error get members";
      });
  },
});

export const {} = memberSlice.actions;
export default memberSlice.reducer;
