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

export const getStatus = createAsyncThunk(
    'vk/getStatus',
    async (data,  thunkApi) => {
        try {
            return new Promise ((resolve, reject) => {
                  // @ts-ignore
                  VK.Auth.getLoginStatus((res) => {
                    if (res.status === 'connected')
                        resolve(res)
                    else if (res.status === 'not_authorized' || res.status === 'unknown')
                        reject(res)    
                  }
                )})
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const getDataUser = createAsyncThunk(
    'vk/getDataUser',
    async (data,  thunkApi) => {
        try {
            return new Promise ((resolve, reject) => {
                  // @ts-ignore
                  VK.Api.call('users.get',{
                    fields:'domain, nickname, photo_50',
                    v:'5.86'
                  },
                   (res) => {
                    resolve(res.response)
                  }
                )})
        } catch (error:any)
        {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)


interface Ilogin {
    data:Tlogin,
    error:string,
    isLoading: boolean,
    status:string,
}

const initialState:Ilogin  = {
    data:{} as Tlogin,
    error:'',
    isLoading: false,
    status:''
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        updateData:(state:any, action) => {
            return {...state,
               data:
                    { id: action.payload.id,
                        domain: action.payload.domain,
                        href: '',
                        first_name: action.payload.first_name,
                        last_name: action.payload.last_name,
                        nickname: action.payload.nickname,
                        photo: action.payload.photo_50,
                    }
                
            }
        }
    },
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
        .addCase(getStatus.fulfilled, (state, action:PayloadAction<any>) => {
            state.status = action.payload.status
        })

    },
})

export const { updateData } = loginSlice.actions
export default loginSlice.reducer