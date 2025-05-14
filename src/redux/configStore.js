import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import login from './login/login';

// Định nghĩa các config persist
const persistConfig = {
    key: 'root', // Key gốc cho toàn bộ persist
    storage,
    whitelist: [""] // Các reducer cần persist
};

// Tạo root reducer
const rootReducer = combineReducers({
    login
});

// Tạo persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === "function") {
        return action(store.dispatch, store.getState);
    }
    return next(action);
};


// Hàm cấu hình store
export const store = configureStore({
    // Sử dụng persisted reducer
    reducer: persistedReducer,

    // Cấu hình middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Bỏ qua kiểm tra serializable cho các action của redux-persist
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(thunkMiddleware),

    // Cấu hình devtools chỉ trong môi trường development
    devTools: import.meta.env.MODE !== 'production',
});

// Tạo persistor
export const persistor = persistStore(store);