import {
    combineReducers,
    configureStore,
    PayloadAction,
    ThunkAction,
    Action
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import counterReducer from '@/store/reducer/counterSlice';
import { authSlice } from '@/store/reducer/authSlice';
import { UserSlice } from "@/store/reducer/userSlice";
import logger from 'redux-logger';

const reducer = (state: any, action: PayloadAction<any>) => {
    return combineReducers({
        counter: counterReducer,
        [authSlice.name]: authSlice.reducer,
        [UserSlice.name]: UserSlice.reducer
    })(state, action);
};

const makeStore = () =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
    });

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: process.env.NODE_ENV === 'development'
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action
>;