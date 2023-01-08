import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  isLoading: false,
  error: "",
};

const getMember = (id: number, offset: number) => {
  return new Promise((resolve, reject) => {
    let VK = window["VK"];
    VK.Api.call(
      "execute.getMembersCustom",
      {
        group_id: id,
        offset: offset,
        v: "5.131",
      },
      (res) => {
        resolve(res.response);
      }
    );
  });
};

export const getParseMember = createAsyncThunk(
  "vk/getParse",
  async (settings: { id: number }, thunkApi) => {
    try {
      await getMember(settings.id, 0).then((res: any) => {
        if (res.total_count > res.offset) {
          const count = Math.trunc(res.total_count / res.offset);
          console.log(count);
          let members = { data: [] };
          let i = 1;
          while (i <= count) {
            // eslint-disable-next-line no-loop-func
            getMember(settings.id, 24000 * i).then((r: any) => {
              members = {
                ...members,
                data: [...members.data, ...r.data],
              };
            });
            i++;
          }
          window["result"] = members;
        } else {
          window["result"] = res;
        }
      });
      return window["result"];
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
