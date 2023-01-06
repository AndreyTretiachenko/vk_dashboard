import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
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
  reducers: {
    addGroup: (state: any, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      return state.groups.filter((item) => {
        return item.groupId !== action.payload.id;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getParseMember.pending,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        getParseMember.fulfilled,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        getParseMember.rejected,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        getGroupInfo.fulfilled,
        (state, action: PayloadAction<any>) => {}
      );
  },
});

export const { addGroup, removeGroup } = parseSlice.actions;
export default parseSlice.reducer;
