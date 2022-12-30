import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const findGroup = createAsyncThunk(
  "vk/searchGroup",
  async (settings: { q: string; offset: number; count: number }, thunkApi) => {
    try {
      return await new Promise((resolve, reject) => {
        // @ts-ignore
        VK.Api.call(
          "groups.search",
          {
            q: settings.q,
            count: settings.count,
            sort:6,
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

const initialState = {
  search: [],
  error: "",
  isLoading: false,
};

export const findFroupByIdSlice = createSlice({
  name: "findGroup",
  initialState,
  reducers: {
    clearList:(state, action) => {
      state.search = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(findGroup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(findGroup.fulfilled, (state, action: PayloadAction<any>) => {
        state.search = action.payload.items;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(findGroup.rejected, (state, action) => {
        state.error = "error find groups";
      });
  },
});

export const { clearList } = findFroupByIdSlice.actions;
export default findFroupByIdSlice.reducer;
