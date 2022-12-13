import { configureStore } from '@reduxjs/toolkit'
import loginSlice from '../features/loginSlice'
import membersSlice from '../features/membersSlice'
import statSlice from '../features/statSlice'

export const store = configureStore({
    reducer:{
        login:loginSlice,
        stats:statSlice,
        members:membersSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch