import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/loginSlice'
import statSlice from '../features/statSlice'

export const store = configureStore({
    reducer:{
        login:loginSlice,
        stats:statSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch