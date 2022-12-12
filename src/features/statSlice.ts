import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TstatsGroup } from '../models/stats'


export const getStats = createAsyncThunk(
    'vk/getStats',
    async (settings:{id:Number, offset:Number}, thunkApi) => {
        try {
            return await new Promise ((resolve, reject) => {
                  // @ts-ignore
                  VK.Api.call('wall.get', {
                    owner_id: settings.id,
                    offset: settings.offset,
                    count:100,
                    v:'5.86'
                  }, (res) => {
                    resolve(res.response.items)
                  }
                )})
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


const initialState:TstatsGroup  = {
 count:0,
 items:[],
 error:'',
 isLoading: false
}

export const statSlice = createSlice({
    name:'Stat',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getStats.pending, (state, action) => {
          state.isLoading = true
        })
        .addCase(getStats.fulfilled, (state, action:PayloadAction<any>) => {
          state.isLoading = false
          state.items = action.payload
        })
        .addCase(getStats.rejected, (state, action) => {
          state.error = 'error get statsGroup'  
        })
    },
})

export const {} = statSlice.actions
export default statSlice.reducer