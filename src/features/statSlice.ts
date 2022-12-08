import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { TstatsGroup } from '../models/stats'


export const getStats = createAsyncThunk(
    'vk/getStats',
    async (data,  thunkApi) => {
        try {
            return await new Promise ((resolve, reject) => {
                  // @ts-ignore
                  VK.Api.call('stats.get', {
                    group_id: 173281049,
                    timestamp_from: 1669903273,
                    interval:'day',
                    v:'5.86'
                  }, (res) => {
                    resolve(res.response)
                  }
                )})
            
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


const initialState:TstatsGroup  = {
 response:[],
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
          state.response = action.payload
        })
        .addCase(getStats.rejected, (state, action) => {
          state.error = 'error get statsGroup'  
        })
    },
})

export const {} = statSlice.actions
export default statSlice.reducer