import {VK} from 'vk-openapi'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getLogin = createAsyncThunk(
    'vk/getLogin',
    async (data,  thunkApi) => {
        try {
            return await new Promise ((resolve, reject)=> {
                VK.Auth.Login((res:any) => {
                    return resolve(res)
                })
            })
            
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

interface Ilogin {
    data:{},
    error:string
    isLoading: boolean
}

const initialState:Ilogin  = {
    data:{},
    error:'',
    isLoading: false
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(getLogin.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(getLogin.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
    },
})

export const {} = loginSlice.actions
export default loginSlice.reducer