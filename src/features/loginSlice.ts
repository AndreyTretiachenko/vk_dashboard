import { createSlice, createAsyncThunk, ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit'
import { Tlogin } from '../models/login'


export const getLogin = createAsyncThunk(
    'vk/getLogin',
    async (data,  thunkApi) => {
        try {
            return new Promise ((resolve, reject) => {
                  // @ts-ignore
                  VK.Auth.login((res) => {
                    resolve(res)
                  }, 1048576
                )})
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


interface Ilogin {
    data:Tlogin,
    error:string
    isLoading: boolean
}

const initialState:Ilogin  = {
    data:{} as Tlogin,
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
        .addCase(getLogin.fulfilled, (state:Ilogin, action:PayloadAction<any>) => {
            state.isLoading = false
            state.data = action.payload.session
        })
        .addCase(getLogin.rejected, (state, action) => {
            state.isLoading = false
            state.error = 'error'
        })
    },
})

export const {} = loginSlice.actions
export default loginSlice.reducer