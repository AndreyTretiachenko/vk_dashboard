import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "../features/loginSlice";
import membersSlice from "../features/membersSlice";
import statSlice from "../features/statSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import favouriteSlice from "../features/favouriteSlice";
import storage from "redux-persist/lib/storage";
import findDroupByIdSlice from "../features/findDroupByIdSlice";
import parseSlice from "../features/parseSlice";

const persistConfig = {
  key: "myroot",
  version: 1.2,
  storage: storage,
  blacklist: ["search", "stats"],
};

const reducers = combineReducers({
  login: loginSlice,
  stats: statSlice,
  members: membersSlice,
  favourite: favouriteSlice,
  search: findDroupByIdSlice,
  parse: parseSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
