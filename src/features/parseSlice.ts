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
  async (settings: { id: number , memberList: any}, thunkApi) => {
    try {
      let settingData = { data: [], count: 0, total_count:0, offset:0, id: 0, photo_100:'', membersListOld:[]};
      let membersAll = { data: [] }
      await getMember(settings.id, 0).then((res: any) => {
        const count = Math.trunc(res.total_count / res.offset);
        settingData = {...settingData, 
          data: [...settingData.data, ...res.data],
          membersListOld: settings.memberList,
          count: count,
          total_count: res.total_count,
          offset: res.offset,
          id: settings.id,
          photo_100: res.photo_100,
        }
        });
        
        if (settingData.count !==0 && settingData.total_count > settingData.offset) {
          // eslint-disable-next-line no-loop-func
          membersAll = {...settingData, data:[...membersAll.data, ...settingData.data]}
          let i = 1;
          while (i <= settingData.count) {
            // eslint-disable-next-line no-loop-func
            await getMember(settings.id, 24000 * i).then((res: any) => {
              // eslint-disable-next-line no-loop-func
              membersAll = {
                ...membersAll,
                data: [...membersAll.data, ...res.data],
              };

            });
            i++;
          }
          if (settingData.membersListOld.length !== 0)
          return {...membersAll,
            newMembers: membersAll.data.filter(x => !settingData.membersListOld.includes(x))
          
          };
          else 
          return membersAll
        } else {
          if (settingData.membersListOld.length !== 0)
          return {...settingData,
            newMembers: settingData.data.filter(x => !settingData.membersListOld.includes(x))
          
          };
          else
          return settingData
        }
        } catch(error: any) {
          return thunkApi.rejectWithValue(error.message);
        }
      
    
  
        });

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
    addGroup: (state:any, action) => {
      return {...state,
        groups: [action.payload, ...state.groups]
      }
    },
    removeGroup: (state:any, action) => {
      return {...state,
        groups: [...state.groups].filter((item) => {
        return item.groupId !== action.payload;
      })
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(
        getParseMember.pending,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        getParseMember.fulfilled,
        (state, action: PayloadAction<any>) => {
          
            return {...state,
              groups: [...state.groups].map((item) => {
                if (item.groupId === action.payload.id) 
                  return {...item, 
                    memberList: action.payload.data,
                    newMembers: action.payload.newMembers,
                    memberUpdate: new Date(Date.now()).toLocaleDateString('ru') + ' ' + new Date(Date.now()).toLocaleTimeString('ru')
                  }
                else
                  return item  
            
            })
          }
        }
      )
      .addCase(
        getParseMember.rejected,
        (state, action: PayloadAction<any>) => {}
      )
  },
});

export const { addGroup, removeGroup } = parseSlice.actions;
export default parseSlice.reducer;
