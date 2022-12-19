import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  membersList: [],
  isLoading: false,
  error: "",
};

export const getParseMember = createAsyncThunk(
  "vk/getParse",
  async (settings: { id: number; next_from: string }, thunkApi) => {
    try {
      return await new Promise((resolve, reject) => {
        // @ts-ignore
        VK.Api.call(
          "groups.getMembers",
          {
            group_id: settings.id,
            next_from: "",
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

export const parseSlice = createSlice({
  name: "parseMember",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getParseMember.pending, (state, action) => {})
      .addCase(
        getParseMember.fulfilled,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(getParseMember.rejected, (state, action) => {});
  },
});

export const {} = parseSlice.actions;
export default parseSlice.reducer;
