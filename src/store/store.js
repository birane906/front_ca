import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";

const persistConfig = {
    key: "root",
    storage
}

const persistUserReducer = persistReducer(persistConfig, userReducer)

let store = configureStore({
    reducer: {
        user: persistUserReducer,
    },
})
let persistor = persistStore(store)

export {
    store, 
    persistor,
}
