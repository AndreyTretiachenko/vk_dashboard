import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  isLoading: false,
  error: "",
};

const getMenber = async (id: number, next_from: string) => {
  return await new Promise((resolve, reject) => {
    let VK = window["VK"];
    VK.Api.call(
      "groups.getMembers",
      {
        group_id: id,
        next_from: next_from,
        v: "5.86",
      },
      (res) => {
        resolve(res);
      }
    );
  });
};

export const getParseMember = createAsyncThunk(
  "vk/getParse",
  async (settings: { id: number; next_from: string }, thunkApi) => {
    try {
      return;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getGroupInfoParse = createAsyncThunk(
  "vk/getGrouoInfo",
  async (settings: { id: number }, thunkApi) => {
    try {
      return new Promise((resolve, reject) => {
        let vk = window["VK"];
        vk.Api.call(
          "groups.getById",
          {
            group_id: settings.id,
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
        getGroupInfoParse.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.groups = action.payload;
        }
      );
  },
});

export const { addGroup, removeGroup } = parseSlice.actions;
export default parseSlice.reducer;
