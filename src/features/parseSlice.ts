import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  membersList: [],
  memberNew:[],
  groupName: "",
  groupId: "",
  screenName: "",
  isLoading: false,
  error: "",
  type: "",
  isClosed: false,
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

export const getGroupInfo = createAsyncThunk(
  "vk/getGrouoInfo",
  async (settings: { id: number }, thunkApi) => {
    try {
      return await new Promise((resolve, reject) => {
        // @ts-ignore
        VK.Api.call(
          "groups.getById",
          {
            group_id: settings.id,
            v: "5.86",
          },
          (res) => {
            resolve(res.response[0]);
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
      .addCase(getParseMember.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(
        getParseMember.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.membersList = action.payload.items;
          state.error = '';
        }
      )
      .addCase(getParseMember.rejected, (state, action) => {
        state.error = "error parseMember";
        state.isLoading = false;
      })
      .addCase(getGroupInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.groupId = action.payload.name;
        state.groupId = action.payload.id;
        state.screenName = action.payload.screen_name;
        state.type = action.payload.type;
        state.isClosed = action.payload.is_closed;
        state.error = '';
      });
  },
});

export const {} = parseSlice.actions;
export default parseSlice.reducer;
