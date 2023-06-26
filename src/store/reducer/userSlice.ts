import {createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {RootState} from "@/store/store";

export interface UserState {
    id: number;
    name: string;
    email: string;
    password: string;
}

const initialState: UserState = {
    id: 0,
    name: '',
    email: '',
    password: ''
}

export const UserSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state
                // ...action.payload.auth
            };
        }
    }
})

export const {setUserState} = UserSlice.actions;
export const selectUserState = (state: RootState) => state.login;
export default UserSlice.reducer;