import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/User";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const reducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (gDM) => gDM().concat(userApi.middleware),
});

export const persistor = persistStore(store);
