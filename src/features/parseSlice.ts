import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
groups:[{
  membersList: [],
  memberNew:[],
  groupName: "",
  groupId: "",
  screenName: "",
  isLoading: false,
  error: "",
  type: "",
  isClosed: false,
}
]
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
    addGroup:(state:any, action) => {
      return state.groups.push(action.payload)
    },
    removeGroup:(state, action) => {
      return state.groups.filter((item) => {
        return item.groupId !== action.payload.id
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getParseMember.pending, (state, action:PayloadAction<any>) => {
        state.groups.map((item) => {
          if (item.groupId === action.payload.id)
            return {...item, isLoading: true}
          else
            return item  
          })
        
      })
      .addCase(
        getParseMember.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.groups.map((item) => {
            if (item.groupId === action.payload.id)
              return {...item, isLoading: false, membersList:action.payload.items, error:''}
            else
              return item  
            })
        }
      )
      .addCase(getParseMember.rejected, (state, action:PayloadAction<any>) => {
        state.groups.map((item) => {
          if (item.groupId === action.payload.id)
            return {...item, isLoading: false, error:'error parseMember'}
          else
            return item  
          })
      })
      .addCase(getGroupInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.groups.map((item) => {
          if (item.groupId === action.payload.id)
            return {
              ...item, 
              isLoading: false, 
              error:'error parseMember',
              groupName:action.payload.name,
              groupId: action.payload.id,
              screenName: action.payload.screen_name,
              type: action.payload.type,
              isClosed: action.payload.is_closed,

            }
          else
            return item  
          })

      });
  },
});

export const {} = parseSlice.actions;
export default parseSlice.reducer;
